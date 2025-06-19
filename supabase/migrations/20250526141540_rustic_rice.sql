/*
  # Create crypto_wagers table

  1. New Tables
    - `crypto_wagers`
      - `id` (uuid, primary key) - Unique identifier for the wager
      - `creator_address` (text, foreign key) - The wallet address of the user creating the wager
      - `opponent_address` (text, foreign key) - The wallet address of the user accepting the wager
      - `token_id` (integer) - ID of the cryptocurrency token
      - `sol_amount` (double precision) - Amount of SOL wagered
      - `description` (text) - Description of the wager
      - `creator_position` (text) - The position taken by the creator
      - `opponent_position` (text) - The position taken by the opponent
      - `status` (text) - Status of the wager (open, matched, settled, cancelled)
      - `created_at` (timestamptz) - When the wager was created
      - `updated_at` (timestamptz) - When the wager was last updated
      - `expires_at` (timestamptz) - When the wager expires
      - `resolved_at` (timestamptz) - When the wager was resolved
      - `winner_address` (text, foreign key) - The wallet address of the winner
      
  2. Security
    - Enable RLS on `crypto_wagers` table
    - Add policies for viewing, creating, and updating wagers
    - Add constraints and validations
*/

-- Create the crypto_wagers table
CREATE TABLE IF NOT EXISTS crypto_wagers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_address TEXT NOT NULL REFERENCES users(wallet_address),
  opponent_address TEXT REFERENCES users(wallet_address),
  token_id INTEGER NOT NULL,
  sol_amount DOUBLE PRECISION NOT NULL,
  description TEXT NOT NULL,
  creator_position TEXT NOT NULL,
  opponent_position TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  winner_address TEXT REFERENCES users(wallet_address)
);

-- Create indexes for faster querying
CREATE INDEX IF NOT EXISTS idx_crypto_wagers_creator_address ON crypto_wagers(creator_address);
CREATE INDEX IF NOT EXISTS idx_crypto_wagers_opponent_address ON crypto_wagers(opponent_address);
CREATE INDEX IF NOT EXISTS idx_crypto_wagers_status ON crypto_wagers(status);
CREATE INDEX IF NOT EXISTS idx_crypto_wagers_token_id ON crypto_wagers(token_id);

-- Add constraints
ALTER TABLE crypto_wagers 
  ADD CONSTRAINT check_crypto_wager_status 
  CHECK (status IN ('open', 'matched', 'settled', 'cancelled'));

ALTER TABLE crypto_wagers 
  ADD CONSTRAINT check_crypto_positive_sol_amount 
  CHECK (sol_amount > 0);

ALTER TABLE crypto_wagers 
  ADD CONSTRAINT check_crypto_different_users 
  CHECK (creator_address != opponent_address);

ALTER TABLE crypto_wagers 
  ADD CONSTRAINT check_crypto_future_expiration 
  CHECK (expires_at > created_at);

ALTER TABLE crypto_wagers 
  ADD CONSTRAINT check_crypto_valid_winner 
  CHECK (
    winner_address IS NULL OR 
    winner_address = creator_address OR 
    winner_address = opponent_address
  );

-- Enable Row Level Security
ALTER TABLE crypto_wagers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view crypto wagers"
  ON crypto_wagers
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own crypto wagers"
  ON crypto_wagers
  FOR INSERT
  WITH CHECK (auth.uid()::text = creator_address);

CREATE POLICY "Creators can update own crypto wagers"
  ON crypto_wagers
  FOR UPDATE
  USING (auth.uid()::text = creator_address AND status = 'open');

CREATE POLICY "Users can accept open crypto wagers"
  ON crypto_wagers
  FOR UPDATE
  USING (status = 'open' AND opponent_address IS NULL)
  WITH CHECK (auth.uid()::text = opponent_address);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_crypto_wager_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_crypto_wager_timestamp
BEFORE UPDATE ON crypto_wagers
FOR EACH ROW
EXECUTE FUNCTION update_crypto_wager_updated_at();

-- Function to validate wager matching
CREATE OR REPLACE FUNCTION validate_crypto_wager_matching()
RETURNS TRIGGER AS $$
BEGIN
  -- If the status is being changed to 'matched', ensure opponent_address is set
  IF NEW.status = 'matched' AND NEW.opponent_address IS NULL THEN
    RAISE EXCEPTION 'Cannot set status to matched without an opponent';
  END IF;

  -- If the opponent_address is being set, change status to 'matched'
  IF NEW.opponent_address IS NOT NULL AND OLD.opponent_address IS NULL THEN
    NEW.status := 'matched';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for the validation function
CREATE TRIGGER validate_crypto_wager_matching_trigger
BEFORE UPDATE ON crypto_wagers
FOR EACH ROW
EXECUTE FUNCTION validate_crypto_wager_matching();

COMMENT ON TABLE crypto_wagers IS 'Table for tracking cryptocurrency wagers between users';