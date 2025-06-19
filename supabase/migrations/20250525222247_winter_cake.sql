/*
  # Database functions for user stats

  This migration creates RPC functions for incrementing values and adding to columns.
  These functions are used for updating user statistics like wins, losses, and profit amounts.
*/

-- Create a function to increment a value
CREATE OR REPLACE FUNCTION increment(row_id text, value int)
RETURNS int AS $$
BEGIN
  RETURN value + 1;
END;
$$ LANGUAGE plpgsql;

-- Create a function to add to a column's value
CREATE OR REPLACE FUNCTION add_to_column(row_id text, value float)
RETURNS float AS $$
BEGIN
  RETURN value + value;
END;
$$ LANGUAGE plpgsql;