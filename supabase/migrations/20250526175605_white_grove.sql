/*
  # Create sports_wagers table

  1. New Tables
    - `sports_wagers`
      - `id` (uuid, primary key) - Unique identifier for the wager
      - `creator_address` (text, foreign key) - The wallet address of the user creating the wager
      - `opponent_address` (text, foreign key) - The wallet address of the user accepting the wager
      - `creator_team_id` (integer) - ID of the creator's team
      - `opponent_team_id` (integer) - ID of the opponent's team
      - `sol_amount` (double precision) - Amount of SOL wagered
      - `event_id` (integer) - ID of the event
      - `sport_type` (text) - Type of sport
      - `status` (text) - Status of the wager (open, live, settled, cancelled)
      - `expires_at` (timestamptz) - When the wager expires
      - `event_date` (date) - Date of the event
      - `event_time` (time) - Time of the event
      - `event_timezone` (text) - Timezone of the event
      - `created_at` (timestamptz) - When the wager was created
      - `updated_at` (timestamptz) - When the wager was last updated
      - `resolved_at` (timestamptz) - When the wager was resolved
      - `winner_address` (text, foreign key) - The wallet address of the winner
      - `description` (text) - Description of the wager
  
  2. Security
    - Enable RLS on `sports_wagers` table
    - Add policies for viewing, creating, and updating wagers
    - Add triggers for automatic status updates
*/

-- Create the sports_wagers table if it doesn't exist
CREATE TABLE IF NOT EXISTS sports_wagers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_address TEXT NOT NULL REFERENCES users(wallet_address),
  opponent_address TEXT REFERENCES users(wallet_address),
  creator_team_id INTEGER NOT NULL,
  opponent_team_id INTEGER,
  sol_amount DOUBLE PRECISION NOT NULL,
  event_id INTEGER NOT NULL,
  sport_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  expires_at TIMESTAMPTZ NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  event_timezone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  winner_address TEXT REFERENCES users(wallet_address),
  description TEXT NOT NULL DEFAULT ''
);

-- Create indexes for faster querying
CREATE INDEX IF NOT EXISTS idx_sports_wagers_creator_address ON sports_wagers(creator_address);
CREATE INDEX IF NOT EXISTS idx_sports_wagers_opponent_address ON sports_wagers(opponent_address);
CREATE INDEX IF NOT EXISTS idx_sports_wagers_status ON sports_wagers(status);
CREATE INDEX IF NOT EXISTS idx_sports_wagers_event_id ON sports_wagers(event_id);
CREATE INDEX IF NOT EXISTS idx_sports_wagers_sport_type ON sports_wagers(sport_type);
CREATE INDEX IF NOT EXISTS idx_sports_wagers_event_date ON sports_wagers(event_date);

-- Add constraints
ALTER TABLE sports_wagers 
  DROP CONSTRAINT IF EXISTS check_sports_wager_status,
  ADD CONSTRAINT check_sports_wager_status 
  CHECK (status IN ('open', 'live', 'settled', 'cancelled'));

ALTER TABLE sports_wagers 
  DROP CONSTRAINT IF EXISTS check_sports_positive_sol_amount,
  ADD CONSTRAINT check_sports_positive_sol_amount 
  CHECK (sol_amount > 0);

ALTER TABLE sports_wagers 
  DROP CONSTRAINT IF EXISTS check_sports_different_users,
  ADD CONSTRAINT check_sports_different_users 
  CHECK (creator_address != opponent_address);

ALTER TABLE sports_wagers 
  DROP CONSTRAINT IF EXISTS check_sports_future_expiration,
  ADD CONSTRAINT check_sports_future_expiration 
  CHECK (expires_at > created_at);

ALTER TABLE sports_wagers 
  DROP CONSTRAINT IF EXISTS check_sports_valid_winner,
  ADD CONSTRAINT check_sports_valid_winner 
  CHECK (
    winner_address IS NULL OR 
    winner_address = creator_address OR 
    winner_address = opponent_address
  );

-- Enable Row Level Security
ALTER TABLE sports_wagers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Anyone can view sports wagers" ON sports_wagers;
CREATE POLICY "Anyone can view sports wagers"
  ON sports_wagers
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create their own sports wagers" ON sports_wagers;
CREATE POLICY "Users can create their own sports wagers"
  ON sports_wagers
  FOR INSERT
  WITH CHECK (auth.uid()::text = creator_address);

DROP POLICY IF EXISTS "Creators can update own sports wagers" ON sports_wagers;
CREATE POLICY "Creators can update own sports wagers"
  ON sports_wagers
  FOR UPDATE
  USING (auth.uid()::text = creator_address AND status = 'open');

DROP POLICY IF EXISTS "Users can accept open sports wagers" ON sports_wagers;
CREATE POLICY "Users can accept open sports wagers"
  ON sports_wagers
  FOR UPDATE
  USING (status = 'open' AND opponent_address IS NULL)
  WITH CHECK (auth.uid()::text = opponent_address);

-- Create trigger functions
CREATE OR REPLACE FUNCTION update_sports_wager_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_sports_wager_matching()
RETURNS TRIGGER AS $$
BEGIN
  -- If the status is being changed to 'live', ensure opponent_address is set
  IF NEW.status = 'live' AND NEW.opponent_address IS NULL THEN
    RAISE EXCEPTION 'Cannot set status to live without an opponent';
  END IF;

  -- If the opponent_address is being set, change status to 'live'
  IF NEW.opponent_address IS NOT NULL AND OLD.opponent_address IS NULL THEN
    NEW.status := 'live';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS update_sports_wager_timestamp ON sports_wagers;
CREATE TRIGGER update_sports_wager_timestamp
BEFORE UPDATE ON sports_wagers
FOR EACH ROW
EXECUTE FUNCTION update_sports_wager_updated_at();

DROP TRIGGER IF EXISTS validate_sports_wager_matching_trigger ON sports_wagers;
CREATE TRIGGER validate_sports_wager_matching_trigger
BEFORE UPDATE ON sports_wagers
FOR EACH ROW
EXECUTE FUNCTION validate_sports_wager_matching();

-- Create functions for sports wager management
CREATE OR REPLACE FUNCTION accept_sports_wager(wager_id UUID, accepting_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record sports_wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM sports_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Sports wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Sports wager is not open for acceptance';
    RETURN FALSE;
  END IF;
  
  -- Check if accepting user is the creator
  IF wager_record.creator_address = accepting_address THEN
    RAISE EXCEPTION 'Cannot accept your own sports wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE sports_wagers
  SET 
    opponent_address = accepting_address,
    status = 'live',
    updated_at = now()
  WHERE id = wager_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION settle_sports_wager(wager_id UUID, winner_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record sports_wagers%ROWTYPE;
  profit_change FLOAT;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM sports_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Sports wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is live
  IF wager_record.status != 'live' THEN
    RAISE EXCEPTION 'Only live sports wagers can be settled';
    RETURN FALSE;
  END IF;
  
  -- Verify winner is either creator or opponent
  IF winner_address != wager_record.creator_address AND winner_address != wager_record.opponent_address THEN
    RAISE EXCEPTION 'Winner must be either the creator or the opponent';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE sports_wagers
  SET 
    status = 'settled',
    winner_address = winner_address,
    resolved_at = now(),
    updated_at = now()
  WHERE id = wager_id;
  
  -- Update user statistics
  -- Winner gets a win and profit increase
  profit_change := wager_record.sol_amount;
  
  UPDATE users
  SET 
    wins = wins + 1,
    profit_amount = profit_amount + profit_change,
    updated_at = now()
  WHERE wallet_address = winner_address;
  
  -- Loser gets a loss and profit decrease
  UPDATE users
  SET 
    losses = losses + 1,
    profit_amount = profit_amount - profit_change,
    updated_at = now()
  WHERE wallet_address = 
    CASE 
      WHEN winner_address = wager_record.creator_address THEN wager_record.opponent_address
      ELSE wager_record.creator_address
    END;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION cancel_sports_wager(wager_id UUID, cancelling_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record sports_wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM sports_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Sports wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Only open sports wagers can be cancelled';
    RETURN FALSE;
  END IF;
  
  -- Verify canceller is the creator
  IF cancelling_address != wager_record.creator_address THEN
    RAISE EXCEPTION 'Only the creator can cancel a sports wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE sports_wagers
  SET 
    status = 'cancelled',
    updated_at = now()
  WHERE id = wager_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_sports_stats(user_address TEXT)
RETURNS TABLE (
  total_sports_wagers BIGINT,
  open_sports_wagers BIGINT,
  live_sports_wagers BIGINT,
  settled_sports_wagers BIGINT,
  cancelled_sports_wagers BIGINT,
  total_amount_sports_wagered FLOAT,
  sports_wins BIGINT,
  sports_losses BIGINT,
  sports_profit FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH user_sports_wagers AS (
    SELECT *
    FROM sports_wagers
    WHERE creator_address = user_address OR opponent_address = user_address
  )
  SELECT
    COUNT(*)::BIGINT AS total_sports_wagers,
    COUNT(*) FILTER (WHERE status = 'open')::BIGINT AS open_sports_wagers,
    COUNT(*) FILTER (WHERE status = 'live')::BIGINT AS live_sports_wagers,
    COUNT(*) FILTER (WHERE status = 'settled')::BIGINT AS settled_sports_wagers,
    COUNT(*) FILTER (WHERE status = 'cancelled')::BIGINT AS cancelled_sports_wagers,
    COALESCE(SUM(sol_amount), 0)::FLOAT AS total_amount_sports_wagered,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address = user_address)::BIGINT AS sports_wins,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address != user_address)::BIGINT AS sports_losses,
    COALESCE(
      SUM(
        CASE 
          WHEN status = 'settled' AND winner_address = user_address THEN sol_amount
          WHEN status = 'settled' AND winner_address != user_address THEN -sol_amount
          ELSE 0
        END
      ), 0
    )::FLOAT AS sports_profit
  FROM user_sports_wagers;
END;
$$ LANGUAGE plpgsql;

-- Add table comment
COMMENT ON TABLE sports_wagers IS 'Table for tracking sports wagers between users';