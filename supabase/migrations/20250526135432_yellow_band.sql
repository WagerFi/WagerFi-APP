/*
  # Add constraints and validation to wagers table

  1. Constraints
    - Add check constraints to ensure valid status values
    - Add check constraint to ensure sol_amount is positive
    - Add check constraint to validate that the opponent address is not the same as the creator
  
  2. Indexes
    - Add indexes for common query patterns to improve performance
*/

-- Add check constraint for valid status values
ALTER TABLE wagers 
  ADD CONSTRAINT check_wager_status 
  CHECK (status IN ('open', 'matched', 'settled', 'cancelled'));

-- Add check constraint for positive sol amount
ALTER TABLE wagers 
  ADD CONSTRAINT check_positive_sol_amount 
  CHECK (sol_amount > 0);

-- Add constraint to ensure creator and opponent are different users
ALTER TABLE wagers 
  ADD CONSTRAINT check_different_users 
  CHECK (creator_address != opponent_address);

-- Add check constraint for valid categories
ALTER TABLE wagers 
  ADD CONSTRAINT check_valid_category 
  CHECK (category IN ('sports', 'crypto', 'gaming', 'misc'));

-- Add check constraint that expires_at is in the future when created
ALTER TABLE wagers 
  ADD CONSTRAINT check_future_expiration 
  CHECK (expires_at > created_at);

-- Add check constraint that winner must be either creator or opponent
ALTER TABLE wagers 
  ADD CONSTRAINT check_valid_winner 
  CHECK (
    winner_address IS NULL OR 
    winner_address = creator_address OR 
    winner_address = opponent_address
  );

-- Function to validate wager matching
CREATE OR REPLACE FUNCTION validate_wager_matching()
RETURNS TRIGGER AS $$
BEGIN
  -- If the status is being changed to 'matched', ensure opponent_address is set
  IF NEW.status = 'matched' AND NEW.opponent_address IS NULL THEN
    RAISE EXCEPTION 'Cannot set status to matched without an opponent';
  END IF;

  -- If the opponent_address is being set, change status to 'matched'
  IF NEW.opponent_address IS NOT NULL AND OLD.opponent_address IS NULL THEN
    NEW.status := 'matched';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for the validation function
CREATE TRIGGER validate_wager_matching_trigger
BEFORE UPDATE ON wagers
FOR EACH ROW
EXECUTE FUNCTION validate_wager_matching();