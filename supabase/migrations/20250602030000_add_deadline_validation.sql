/*
  # Add deadline validation to wager acceptance functions

  This migration updates the accept_crypto_wager and accept_sports_wager functions
  to check if the wager deadline has passed before allowing acceptance.
*/

-- Update the accept_crypto_wager function to include deadline validation
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
  
  -- Check if deadline has passed
  IF now() >= wager_record.expires_at THEN
    RAISE EXCEPTION 'Cannot accept wager: deadline has passed';
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

-- Update the accept_sports_wager function to include deadline validation
CREATE OR REPLACE FUNCTION accept_sports_wager(wager_id UUID, accepting_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  wager_record sports_wagers%ROWTYPE;
BEGIN
  -- Get the wager
  SELECT * INTO wager_record FROM sports_wagers WHERE id = wager_id;
  
  -- Check if wager exists
  IF wager_record IS NULL THEN
    RAISE EXCEPTION 'Sports wager not found';
    RETURN FALSE;
  END IF;
  
  -- Check if wager is open
  IF wager_record.status != 'open' THEN
    RAISE EXCEPTION 'Sports wager is not open for acceptance';
    RETURN FALSE;
  END IF;
  
  -- Check if deadline has passed
  IF now() >= wager_record.expires_at THEN
    RAISE EXCEPTION 'Cannot accept wager: deadline has passed';
    RETURN FALSE;
  END IF;
  
  -- Check if accepting user is the creator
  IF wager_record.creator_address = accepting_address THEN
    RAISE EXCEPTION 'Cannot accept your own sports wager';
    RETURN FALSE;
  END IF;

  -- Update the wager
  UPDATE sports_wagers
  SET 
    opponent_address = accepting_address,
    status = 'live',
    updated_at = now()
  WHERE id = wager_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql; 