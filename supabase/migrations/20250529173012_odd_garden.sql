/*
  # Add reserved_address column to sports_wagers table

  1. Changes
    - Add `reserved_address` TEXT column to the `sports_wagers` table
      - This column is nullable (NULL) since not all wagers will have a reserved address
      - No default value is set as it will be explicitly set to NULL when not provided
  
  2. Purpose
    - Enables users to reserve wagers for specific wallet addresses
    - Allows the application to validate if the user accepting a wager is the intended recipient
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sports_wagers' AND column_name = 'reserved_address'
  ) THEN
    ALTER TABLE sports_wagers ADD COLUMN reserved_address TEXT NULL;
  END IF;
END $$;