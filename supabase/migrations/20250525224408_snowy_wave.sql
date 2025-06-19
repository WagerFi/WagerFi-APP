/*
  # Users table with RLS policies

  1. New Tables
    - `users`
      - `wallet_address` (text, primary key) - Wallet address of the user
      - `username` (text) - Optional username
      - `profile_image_url` (text) - Optional profile image URL
      - `wins` (integer) - Number of wagers won, defaults to 0
      - `losses` (integer) - Number of wagers lost, defaults to 0
      - `profit_amount` (double precision) - Total profit/loss amount, defaults to 0
      - `created_at` (timestamptz) - When the profile was created
      - `updated_at` (timestamptz) - When the profile was last updated

  2. Security
    - Enable RLS on `users` table
    - Add policies for:
      - Anyone can view all users (for leaderboards)
      - Users can create their own profile (wallet_address = auth.uid)
      - Users can only update their own profile (wallet_address = auth.uid)
*/

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  wallet_address TEXT PRIMARY KEY,
  username TEXT,
  profile_image_url TEXT,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  profit_amount DOUBLE PRECISION DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist using DO blocks
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Anyone can view users'
  ) THEN
    CREATE POLICY "Anyone can view users"
      ON users
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can create their own profile'
  ) THEN
    CREATE POLICY "Users can create their own profile"
      ON users
      FOR INSERT
      WITH CHECK (auth.uid()::text = wallet_address);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON users
      FOR UPDATE
      USING (auth.uid()::text = wallet_address);
  END IF;
END $$;

-- Create or replace functions for stats management
CREATE OR REPLACE FUNCTION increment(value int)
RETURNS int AS $$
BEGIN
  RETURN value + 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_to_column(value float)
RETURNS float AS $$
BEGIN
  RETURN value;
END;
$$ LANGUAGE plpgsql;