-- First drop any existing settle_crypto_wager function with the same parameter signature
DROP FUNCTION IF EXISTS settle_crypto_wager(UUID, TEXT, DOUBLE PRECISION);

-- Create the settle_crypto_wager function to handle price-based resolution
CREATE OR REPLACE FUNCTION settle_crypto_wager(
  wager_id UUID,
  input_winner_address TEXT,
  current_price DOUBLE PRECISION DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record crypto_wagers%ROWTYPE;
  profit_change FLOAT;
  price_snapshot JSONB;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM crypto_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Crypto wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is matched
  IF wager_record.status != 'matched' THEN
    RAISE EXCEPTION 'Only matched crypto wagers can be settled';
    RETURN FALSE;
  END IF;
  
  -- Check if current time is past the expiration
  IF now() < wager_record.expires_at THEN
    RAISE EXCEPTION 'Cannot settle a wager before its expiration date';
    RETURN FALSE;
  END IF;
  
  -- Verify winner is either creator or opponent
  IF input_winner_address != wager_record.creator_address AND input_winner_address != wager_record.opponent_address THEN
    RAISE EXCEPTION 'Winner must be either the creator or the opponent';
    RETURN FALSE;
  END IF;
  
  -- Create a snapshot of the current price if provided
  IF current_price IS NOT NULL THEN
    price_snapshot := jsonb_build_object(
      'final_price', current_price,
      'resolved_at', now(),
      'target_price', wager_record.target_price,
      'creator_position', wager_record.creator_position
    );
  ELSE
    price_snapshot := NULL;
  END IF;

  -- Update the wager
  UPDATE crypto_wagers
  SET 
    status = 'settled',
    winner_address = input_winner_address,
    resolved_at = now(),
    updated_at = now(),
    token_snapshot = CASE 
                       WHEN token_snapshot IS NULL THEN price_snapshot
                       WHEN price_snapshot IS NULL THEN token_snapshot
                       ELSE token_snapshot || price_snapshot
                     END
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

COMMENT ON FUNCTION settle_crypto_wager(UUID, TEXT, DOUBLE PRECISION) IS 'Function to settle a crypto wager with price verification';