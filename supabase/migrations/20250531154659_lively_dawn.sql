-- Update the settle_sports_wager function to use unambiguous parameter names
-- First drop the existing function
DROP FUNCTION IF EXISTS settle_sports_wager(uuid, text);

-- Then recreate it with unambiguous parameter names
CREATE OR REPLACE FUNCTION settle_sports_wager(
  wager_id UUID,
  input_winner_address TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record sports_wagers%ROWTYPE;
  profit_change FLOAT;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM sports_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Sports wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is live
  IF wager_record.status != 'live' THEN
    RAISE EXCEPTION 'Only live sports wagers can be settled';
    RETURN FALSE;
  END IF;
  
  -- Verify winner is either creator or opponent
  IF input_winner_address != wager_record.creator_address AND input_winner_address != wager_record.opponent_address THEN
    RAISE EXCEPTION 'Winner must be either the creator or the opponent';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE sports_wagers
  SET 
    status = 'settled',
    winner_address = input_winner_address,
    resolved_at = now(),
    updated_at = now()
  WHERE id = wager_id;
  
  -- Update user statistics
  -- Winner gets a win and profit increase
  profit_change := wager_record.sol_amount;
  
  UPDATE users
  SET 
    wins = wins + 1,
    profit_amount = profit_amount + profit_change,
    updated_at = now()
  WHERE wallet_address = input_winner_address;
  
  -- Loser gets a loss and profit decrease
  UPDATE users
  SET 
    losses = losses + 1,
    profit_amount = profit_amount - profit_change,
    updated_at = now()
  WHERE wallet_address = 
    CASE 
      WHEN input_winner_address = wager_record.creator_address THEN wager_record.opponent_address
      ELSE wager_record.creator_address
    END;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION settle_sports_wager IS 'Function to settle a sports wager with an unambiguous winner parameter';