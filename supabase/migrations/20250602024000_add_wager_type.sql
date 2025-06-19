-- Add wager_type column to crypto_wagers table for clearer resolution criteria
-- This allows us to distinguish between "reach target" and "price at deadline" wagers

ALTER TABLE crypto_wagers 
ADD COLUMN wager_type TEXT CHECK (wager_type IN ('reach_target', 'price_at_deadline')) DEFAULT 'reach_target';

-- Add comment to explain the column
COMMENT ON COLUMN crypto_wagers.wager_type IS 'Type of wager resolution: reach_target (resolves when price hits target) or price_at_deadline (resolves only at deadline)';

-- Update existing wagers to use the default 'reach_target' type for backward compatibility
UPDATE crypto_wagers 
SET wager_type = 'reach_target' 
WHERE wager_type IS NULL; 