/*
  # Add reserved_address column to crypto_wagers table

  This migration adds a reserved_address column to the crypto_wagers table
  to allow wagers to be reserved for specific wallet addresses.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crypto_wagers' AND column_name = 'reserved_address'
  ) THEN
    ALTER TABLE crypto_wagers ADD COLUMN reserved_address TEXT NULL;
  END IF;
END $$;