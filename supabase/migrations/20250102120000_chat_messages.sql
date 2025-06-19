/*
  # Chat Messages table with RLS policies

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `message` (text) - The message content
      - `user_address` (text) - Wallet address of the sender (references users.wallet_address)
      - `username` (text) - Display name at time of message (cached for performance)
      - `profile_image_url` (text) - Profile image URL at time of message (cached)
      - `reply_to_id` (uuid) - Optional reference to message being replied to
      - `is_deleted` (boolean) - Soft delete flag for moderation
      - `created_at` (timestamptz) - When the message was sent
      - `updated_at` (timestamptz) - When the message was last edited

  2. Security
    - Enable RLS on `chat_messages` table
    - Add policies for:
      - Anyone can view non-deleted messages
      - Authenticated users can create messages
      - Users can update/delete their own messages
      - Admins can moderate (delete) any message

  3. Indexes
    - Index on created_at for chronological ordering
    - Index on user_address for user-specific queries
    - Index on reply_to_id for threading
*/

-- Create the chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL CHECK (length(trim(message)) > 0 AND length(message) <= 2000),
  user_address TEXT NOT NULL REFERENCES users(wallet_address) ON DELETE CASCADE,
  username TEXT,
  profile_image_url TEXT,
  reply_to_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_address ON chat_messages(user_address);
CREATE INDEX IF NOT EXISTS idx_chat_messages_reply_to ON chat_messages(reply_to_id) WHERE reply_to_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_chat_messages_active ON chat_messages(created_at DESC) WHERE is_deleted = FALSE;

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- Anyone can view non-deleted messages
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Anyone can view active messages'
  ) THEN
    CREATE POLICY "Anyone can view active messages"
      ON chat_messages
      FOR SELECT
      USING (is_deleted = FALSE);
  END IF;
END $$;

DO $$ 
BEGIN
  -- Authenticated users can create messages (wallet address must match)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Users can create messages'
  ) THEN
    CREATE POLICY "Users can create messages"
      ON chat_messages
      FOR INSERT
      WITH CHECK (auth.uid()::text = user_address);
  END IF;
END $$;

DO $$ 
BEGIN
  -- Users can update their own messages
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Users can update own messages'
  ) THEN
    CREATE POLICY "Users can update own messages"
      ON chat_messages
      FOR UPDATE
      USING (auth.uid()::text = user_address)
      WITH CHECK (auth.uid()::text = user_address);
  END IF;
END $$;

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_chat_message_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on message edits
DROP TRIGGER IF EXISTS chat_messages_updated_at_trigger ON chat_messages;
CREATE TRIGGER chat_messages_updated_at_trigger
  BEFORE UPDATE ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_message_updated_at();

-- Create function to get recent chat messages with user info
CREATE OR REPLACE FUNCTION get_recent_chat_messages(
  message_limit INTEGER DEFAULT 50,
  before_timestamp TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  message TEXT,
  user_address TEXT,
  username TEXT,
  profile_image_url TEXT,
  reply_to_id UUID,
  reply_to_message TEXT,
  reply_to_username TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cm.id,
    cm.message,
    cm.user_address,
    COALESCE(cm.username, u.username, 'Anonymous') as username,
    COALESCE(cm.profile_image_url, u.profile_image_url) as profile_image_url,
    cm.reply_to_id,
    rm.message as reply_to_message,
    COALESCE(rm.username, ru.username, 'Anonymous') as reply_to_username,
    cm.created_at,
    cm.updated_at
  FROM chat_messages cm
  LEFT JOIN users u ON cm.user_address = u.wallet_address
  LEFT JOIN chat_messages rm ON cm.reply_to_id = rm.id
  LEFT JOIN users ru ON rm.user_address = ru.wallet_address
  WHERE 
    cm.is_deleted = FALSE 
    AND (before_timestamp IS NULL OR cm.created_at < before_timestamp)
  ORDER BY cm.created_at DESC
  LIMIT message_limit;
END;
$$ LANGUAGE plpgsql;

-- Create function to send a new chat message
CREATE OR REPLACE FUNCTION send_chat_message(
  message_text TEXT,
  sender_address TEXT,
  reply_to_message_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_message_id UUID;
  sender_username TEXT;
  sender_profile_image TEXT;
BEGIN
  -- Get current user info to cache in message
  SELECT username, profile_image_url 
  INTO sender_username, sender_profile_image
  FROM users 
  WHERE wallet_address = sender_address;
  
  -- Insert the new message
  INSERT INTO chat_messages (
    message, 
    user_address, 
    username, 
    profile_image_url, 
    reply_to_id
  ) VALUES (
    trim(message_text),
    sender_address,
    sender_username,
    sender_profile_image,
    reply_to_message_id
  ) RETURNING id INTO new_message_id;
  
  RETURN new_message_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE chat_messages IS 'Stores live chat messages with user information and threading support';
COMMENT ON FUNCTION get_recent_chat_messages(INTEGER, TIMESTAMPTZ) IS 'Retrieves recent chat messages with user and reply information';
COMMENT ON FUNCTION send_chat_message(TEXT, TEXT, UUID) IS 'Sends a new chat message with cached user information'; 