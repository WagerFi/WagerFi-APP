/*
  # Create wagers table for WagerFi app

  1. New Tables
    - `wagers`
      - `id` (uuid, primary key) - Unique identifier for the wager
      - `creator_address` (text) - The wallet address of the user who created the wager
      - `opponent_address` (text) - The wallet address of the opponent who accepted the wager (null until matched)
      - `sol_amount` (float) - Amount of SOL wagered
      - `category` (text) - Category of the wager (e.g., sports, crypto)
      - `description` (text) - Description of the wager
      - `creator_position` (text) - Creator's position in the wager (e.g., team/player to win, price increase)
      - `opponent_position` (text) - Opponent's position in the wager (opposite of creator's position)
      - `status` (text) - Status of the wager (open, matched, settled, cancelled)
      - `created_at` (timestamptz) - When the wager was created
      - `updated_at` (timestamptz) - When the wager was last updated
      - `expires_at` (timestamptz) - When the wager expires/deadline
      - `resolved_at` (timestamptz) - When the wager was resolved
      - `winner_address` (text) - Wallet address of the winner (null until resolved)
      - `sport_type` (text) - Type of sport (null for non-sports wagers)
      - `event_date` (date) - Date of the event (null for non-event wagers)
      - `event_time` (time) - Time of the event (null for non-event wagers)
      - `event_timezone` (text) - Timezone of the event (null for non-event wagers)
  
  2. Security
    - Enable RLS on `wagers` table
    - Add policy for public users to read all wagers (for discovery)
    - Add policy for authenticated users to create their own wagers
    - Add policy for authenticated creators to update their own wagers
*/

-- Create the wagers table
CREATE TABLE IF NOT EXISTS wagers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_address TEXT NOT NULL REFERENCES users(wallet_address),
  opponent_address TEXT REFERENCES users(wallet_address),
  sol_amount FLOAT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  creator_position TEXT NOT NULL,
  opponent_position TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  winner_address TEXT REFERENCES users(wallet_address),
  sport_type TEXT,
  event_date DATE,
  event_time TIME,
  event_timezone TEXT
);

-- Create index for faster querying by creator and opponent
CREATE INDEX IF NOT EXISTS idx_wagers_creator_address ON wagers(creator_address);
CREATE INDEX IF NOT EXISTS idx_wagers_opponent_address ON wagers(opponent_address);
CREATE INDEX IF NOT EXISTS idx_wagers_status ON wagers(status);
CREATE INDEX IF NOT EXISTS idx_wagers_category ON wagers(category);

-- Enable Row Level Security
ALTER TABLE wagers ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view all wagers
CREATE POLICY "Anyone can view wagers"
  ON wagers
  FOR SELECT
  USING (true);

-- Create policy for users to create their own wagers
CREATE POLICY "Users can create their own wagers"
  ON wagers
  FOR INSERT
  WITH CHECK (auth.uid()::text = creator_address);

-- Create policy for users to update their own wagers
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'wagers' AND policyname = 'Creators can update own wagers'
  ) THEN
    CREATE POLICY "Creators can update own wagers"
      ON wagers
      FOR UPDATE
      USING (auth.uid()::text = creator_address AND status = 'open');
  END IF;
END $$;

-- Create policy for opponents to accept open wagers
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'wagers' AND policyname = 'Users can accept open wagers'
  ) THEN
    CREATE POLICY "Users can accept open wagers"
      ON wagers
      FOR UPDATE
      USING (status = 'open' AND opponent_address IS NULL)
      WITH CHECK (auth.uid()::text = opponent_address);
  END IF;
END $$;

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_wager_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wager_timestamp
BEFORE UPDATE ON wagers
FOR EACH ROW
EXECUTE FUNCTION update_wager_updated_at();

COMMENT ON TABLE wagers IS 'Table for tracking wagers between users';