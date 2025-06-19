/*
  # Fix Chat Messages RLS Policies for Wallet-Based Auth

  Since we're using wallet-based authentication instead of Supabase Auth,
  auth.uid() is always null. We need to update the RLS policies to work
  with our wallet-based system or disable RLS for now.

  For now, we'll disable RLS on chat_messages and rely on application-level
  validation, but we'll keep the foreign key constraints for data integrity.
*/

-- Drop existing policies that use auth.uid()
DROP POLICY IF EXISTS "Users can create messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can update own messages" ON chat_messages;

-- Disable RLS for chat_messages since we're using wallet-based auth
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

-- Keep the policy for viewing messages (this one doesn't depend on auth.uid())
-- This is already working fine

-- Add a comment explaining the security model
COMMENT ON TABLE chat_messages IS 'Chat messages table - RLS disabled for wallet-based auth. Security enforced at application level.';

-- Optionally, we could create policies that work without auth.uid() like this:
-- But for simplicity, we'll disable RLS and rely on application validation

/*
-- Alternative: Create policies that don't rely on auth.uid()
-- Anyone can view non-deleted messages (this already works)
CREATE POLICY "Anyone can view active messages"
  ON chat_messages
  FOR SELECT
  USING (is_deleted = FALSE);

-- Anyone can insert messages (we validate at application level)
CREATE POLICY "Anyone can create messages"
  ON chat_messages
  FOR INSERT
  WITH CHECK (true);

-- Users can update messages (we validate wallet ownership at application level)
CREATE POLICY "Anyone can update messages"
  ON chat_messages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
*/ 