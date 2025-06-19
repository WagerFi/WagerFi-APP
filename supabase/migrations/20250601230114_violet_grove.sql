/*
  # Add target_price column to crypto_wagers table

  1. Changes
    - Add `target_price` DOUBLE PRECISION column to the `crypto_wagers` table
      - This column will store the target price that the wager creator sets
      - NULLABLE for backward compatibility with existing records
  
  2. Purpose
    - Enables storing the exact target price for crypto price prediction wagers
    - Important for accurate settlement verification
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crypto_wagers' AND column_name = 'target_price'
  ) THEN
    ALTER TABLE crypto_wagers ADD COLUMN target_price DOUBLE PRECISION NULL;
  END IF;
END $$;

-- Add comment explaining the column
COMMENT ON COLUMN crypto_wagers.target_price IS 'The target price for the crypto wager, used to determine if prediction is correct';