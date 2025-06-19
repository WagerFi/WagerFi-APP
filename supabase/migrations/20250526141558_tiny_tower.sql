/*
  # Add functions for crypto wagers management

  This migration creates functions for:
  1. Accepting crypto wagers
  2. Settling crypto wagers
  3. Cancelling crypto wagers
  4. Getting crypto wager statistics
*/

-- Function to accept a crypto wager
CREATE OR REPLACE FUNCTION accept_crypto_wager(wager_id UUID, accepting_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record crypto_wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM crypto_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Crypto wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Crypto wager is not open for acceptance';
    RETURN FALSE;
  END IF;
  
  -- Check if accepting user is the creator
  IF wager_record.creator_address = accepting_address THEN
    RAISE EXCEPTION 'Cannot accept your own crypto wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE crypto_wagers
  SET 
    opponent_address = accepting_address,
    status = 'matched',
    updated_at = now()
  WHERE id = wager_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to settle a crypto wager
CREATE OR REPLACE FUNCTION settle_crypto_wager(wager_id UUID, winner_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record crypto_wagers%ROWTYPE;
  profit_change FLOAT;
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
  
  -- Verify winner is either creator or opponent
  IF winner_address != wager_record.creator_address AND winner_address != wager_record.opponent_address THEN
    RAISE EXCEPTION 'Winner must be either the creator or the opponent';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE crypto_wagers
  SET 
    status = 'settled',
    winner_address = winner_address,
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
  WHERE wallet_address = winner_address;
  
  -- Loser gets a loss and profit decrease
  UPDATE users
  SET 
    losses = losses + 1,
    profit_amount = profit_amount - profit_change,
    updated_at = now()
  WHERE wallet_address = 
    CASE 
      WHEN winner_address = wager_record.creator_address THEN wager_record.opponent_address
      ELSE wager_record.creator_address
    END;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to cancel a crypto wager
CREATE OR REPLACE FUNCTION cancel_crypto_wager(wager_id UUID, cancelling_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record crypto_wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM crypto_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Crypto wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Only open crypto wagers can be cancelled';
    RETURN FALSE;
  END IF;
  
  -- Verify canceller is the creator
  IF cancelling_address != wager_record.creator_address THEN
    RAISE EXCEPTION 'Only the creator can cancel a crypto wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE crypto_wagers
  SET 
    status = 'cancelled',
    updated_at = now()
  WHERE id = wager_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to get user crypto wager statistics
CREATE OR REPLACE FUNCTION get_user_crypto_stats(user_address TEXT)
RETURNS TABLE (
  total_crypto_wagers BIGINT,
  open_crypto_wagers BIGINT,
  matched_crypto_wagers BIGINT,
  settled_crypto_wagers BIGINT,
  cancelled_crypto_wagers BIGINT,
  total_amount_crypto_wagered FLOAT,
  crypto_wins BIGINT,
  crypto_losses BIGINT,
  crypto_profit FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH user_crypto_wagers AS (
    SELECT *
    FROM crypto_wagers
    WHERE creator_address = user_address OR opponent_address = user_address
  )
  SELECT
    COUNT(*)::BIGINT AS total_crypto_wagers,
    COUNT(*) FILTER (WHERE status = 'open')::BIGINT AS open_crypto_wagers,
    COUNT(*) FILTER (WHERE status = 'matched')::BIGINT AS matched_crypto_wagers,
    COUNT(*) FILTER (WHERE status = 'settled')::BIGINT AS settled_crypto_wagers,
    COUNT(*) FILTER (WHERE status = 'cancelled')::BIGINT AS cancelled_crypto_wagers,
    COALESCE(SUM(sol_amount), 0)::FLOAT AS total_amount_crypto_wagered,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address = user_address)::BIGINT AS crypto_wins,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address != user_address)::BIGINT AS crypto_losses,
    COALESCE(
      SUM(
        CASE 
          WHEN status = 'settled' AND winner_address = user_address THEN sol_amount
          WHEN status = 'settled' AND winner_address != user_address THEN -sol_amount
          ELSE 0
        END
      ), 0
    )::FLOAT AS crypto_profit
  FROM user_crypto_wagers;
END;
$$ LANGUAGE plpgsql;