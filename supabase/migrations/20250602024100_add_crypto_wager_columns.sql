-- Add missing columns to crypto_wagers table
ALTER TABLE crypto_wagers 
ADD COLUMN IF NOT EXISTS target_price DECIMAL(20, 8),
ADD COLUMN IF NOT EXISTS wager_type TEXT DEFAULT 'reach_target' CHECK (wager_type IN ('reach_target', 'price_at_deadline'));

-- Add comment to document the columns
COMMENT ON COLUMN crypto_wagers.target_price IS 'Target price for the crypto wager resolution';
COMMENT ON COLUMN crypto_wagers.wager_type IS 'Resolution type: reach_target (instant settlement) or price_at_deadline (deadline-only settlement)'; 