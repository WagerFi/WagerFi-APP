/*
  # Fix for date format handling in sports wagers table

  This migration ensures the event_date column in sports_wagers table 
  can properly handle dates in YYYY-MM-DD format.
*/

-- Drop the date/time format constraints
ALTER DATABASE postgres SET datestyle = 'ISO, MDY';

-- Add a function to help with date conversion
CREATE OR REPLACE FUNCTION try_parse_date(date_text TEXT)
RETURNS DATE AS $$
BEGIN
  -- Try standard ISO format (YYYY-MM-DD)
  RETURN date_text::DATE;
EXCEPTION WHEN others THEN
  BEGIN
    -- Try European format (DD/MM/YYYY)
    RETURN to_date(date_text, 'DD/MM/YYYY');
  EXCEPTION WHEN others THEN
    BEGIN
      -- Try US format (MM/DD/YYYY)
      RETURN to_date(date_text, 'MM/DD/YYYY');
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'Invalid date format: %', date_text;
    END;
  END;
END;
$$ LANGUAGE plpgsql;

-- Modify the function that validates sports wager creation
CREATE OR REPLACE FUNCTION validate_sports_wager_dates()
RETURNS TRIGGER AS $$
BEGIN
  -- Convert date string to proper date format if needed
  IF NEW.event_date IS NOT NULL THEN
    BEGIN
      -- First try direct assignment (already in correct format)
      NEW.event_date := NEW.event_date::DATE;
    EXCEPTION WHEN others THEN
      BEGIN
        -- Try alternative formats
        NEW.event_date := try_parse_date(NEW.event_date::TEXT);
      EXCEPTION WHEN others THEN
        RAISE EXCEPTION 'Invalid event_date format: %', NEW.event_date;
      END;
    END;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to validate and convert dates before insert/update
DROP TRIGGER IF EXISTS validate_sports_wager_dates_trigger ON sports_wagers;
CREATE TRIGGER validate_sports_wager_dates_trigger
BEFORE INSERT OR UPDATE ON sports_wagers
FOR EACH ROW
EXECUTE FUNCTION validate_sports_wager_dates();