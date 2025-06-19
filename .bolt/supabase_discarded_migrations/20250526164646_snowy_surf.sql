/*
  # Update sports_wagers table to add description and creator_position fields

  1. Changes
    - Add `description` field to store what the wager is about
    - Add `creator_position` field to store the position taken by the creator (home/away team selection)
*/

-- Add the description field
ALTER TABLE IF EXISTS sports_wagers
ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT 'Sports Wager';

-- Add the creator_position field
ALTER TABLE IF EXISTS sports_wagers
ADD COLUMN IF NOT EXISTS creator_position TEXT NOT NULL DEFAULT 'home';

-- Ensure all RLS policies are still in place
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'sports_wagers' AND policyname = 'Anyone can view sports wagers'
  ) THEN
    CREATE POLICY "Anyone can view sports wagers"
      ON sports_wagers
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'sports_wagers' AND policyname = 'Users can create their own sports wagers'
  ) THEN
    CREATE POLICY "Users can create their own sports wagers"
      ON sports_wagers
      FOR INSERT
      WITH CHECK (auth.uid()::text = creator_address);
  END IF;
END $$;

-- Add comment to explain the fields
COMMENT ON COLUMN sports_wagers.description IS 'Description of the wager, e.g. "Team A to win against Team B"';
COMMENT ON COLUMN sports_wagers.creator_position IS 'Position taken by the creator, e.g. "home" or "away" for team selection';