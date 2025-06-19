/*
  # Add functions for wager management

  1. Functions
    - Create function to accept a wager
    - Create function to settle a wager
    - Create function to cancel a wager
    - Create function to get user statistics
*/

-- Function to accept a wager
CREATE OR REPLACE FUNCTION accept_wager(wager_id UUID, accepting_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Wager is not open for acceptance';
    RETURN FALSE;
  END IF;
  
  -- Check if accepting user is the creator
  IF wager_record.creator_address = accepting_address THEN
    RAISE EXCEPTION 'Cannot accept your own wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE wagers
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

-- Function to settle a wager
CREATE OR REPLACE FUNCTION settle_wager(wager_id UUID, winner_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record wagers%ROWTYPE;
  profit_change FLOAT;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is matched
  IF wager_record.status != 'matched' THEN
    RAISE EXCEPTION 'Only matched wagers can be settled';
    RETURN FALSE;
  END IF;
  
  -- Verify winner is either creator or opponent
  IF winner_address != wager_record.creator_address AND winner_address != wager_record.opponent_address THEN
    RAISE EXCEPTION 'Winner must be either the creator or the opponent';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE wagers
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

-- Function to cancel a wager
CREATE OR REPLACE FUNCTION cancel_wager(wager_id UUID, cancelling_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Only open wagers can be cancelled';
    RETURN FALSE;
  END IF;
  
  -- Verify canceller is the creator
  IF cancelling_address != wager_record.creator_address THEN
    RAISE EXCEPTION 'Only the creator can cancel a wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE wagers
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

-- Function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_address TEXT)
RETURNS TABLE (
  total_wagers BIGINT,
  open_wagers BIGINT,
  matched_wagers BIGINT,
  settled_wagers BIGINT,
  cancelled_wagers BIGINT,
  total_amount_wagered FLOAT,
  wins BIGINT,
  losses BIGINT,
  profit FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH user_wagers AS (
    SELECT *
    FROM wagers
    WHERE creator_address = user_address OR opponent_address = user_address
  )
  SELECT
    COUNT(*)::BIGINT AS total_wagers,
    COUNT(*) FILTER (WHERE status = 'open')::BIGINT AS open_wagers,
    COUNT(*) FILTER (WHERE status = 'matched')::BIGINT AS matched_wagers,
    COUNT(*) FILTER (WHERE status = 'settled')::BIGINT AS settled_wagers,
    COUNT(*) FILTER (WHERE status = 'cancelled')::BIGINT AS cancelled_wagers,
    COALESCE(SUM(sol_amount), 0)::FLOAT AS total_amount_wagered,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address = user_address)::BIGINT AS wins,
    COUNT(*) FILTER (WHERE status = 'settled' AND winner_address != user_address)::BIGINT AS losses,
    COALESCE(
      SUM(
        CASE 
          WHEN status = 'settled' AND winner_address = user_address THEN sol_amount
          WHEN status = 'settled' AND winner_address != user_address THEN -sol_amount
          ELSE 0
        END
      ), 0
    )::FLOAT AS profit
  FROM user_wagers;
END;
$$ LANGUAGE plpgsql;