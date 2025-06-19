/*
  # Add description column to sports_wagers table

  1. Changes
    - Add `description` column to `sports_wagers` table if it doesn't exist
    
  This fixes an issue where the application code attempts to access a 'description' 
  column that doesn't exist in the database schema.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'sports_wagers' AND column_name = 'description'
  ) THEN
    ALTER TABLE sports_wagers ADD COLUMN description TEXT NOT NULL DEFAULT '';
  END IF;
END $$;