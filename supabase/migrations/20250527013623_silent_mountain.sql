/*
  # Add JSON snapshot fields to sports_wagers table

  1. Changes
    - Add `creator_team_snapshot` (JSONB) column to store team details
    - Add `opponent_team_snapshot` (JSONB) column to store opponent team details
    - Add `event_snapshot` (JSONB) column to store event details
    
  This allows us to store all the relevant information at wager creation time,
  reducing the need for API calls when displaying wager details later.
*/

-- Add columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'sports_wagers' AND column_name = 'creator_team_snapshot'
  ) THEN
    ALTER TABLE sports_wagers ADD COLUMN creator_team_snapshot JSONB;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'sports_wagers' AND column_name = 'opponent_team_snapshot'
  ) THEN
    ALTER TABLE sports_wagers ADD COLUMN opponent_team_snapshot JSONB;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'sports_wagers' AND column_name = 'event_snapshot'
  ) THEN
    ALTER TABLE sports_wagers ADD COLUMN event_snapshot JSONB;
  END IF;
END $$;

-- Update the comment on the table to reflect the new columns
COMMENT ON TABLE sports_wagers IS 'Table for tracking sports wagers between users with snapshot data for teams and events';