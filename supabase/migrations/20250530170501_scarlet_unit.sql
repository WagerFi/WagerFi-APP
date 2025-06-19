/*
  # Add token_snapshot column to crypto_wagers table

  1. Changes
    - Add `token_snapshot` JSONB column to the `crypto_wagers` table
      - This column will store token details like name, symbol, logo, etc.
      - Similar to how sports_wagers stores team and event snapshots
  
  2. Purpose
    - Reduces API calls to CoinMarketCap by storing token data at creation time
    - Improves performance when displaying wagers
    - Makes the application more resilient to API downtime
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crypto_wagers' AND column_name = 'token_snapshot'
  ) THEN
    ALTER TABLE crypto_wagers ADD COLUMN token_snapshot JSONB;
  END IF;
END $$;