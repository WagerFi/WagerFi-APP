/*
  # Create users table for WagerFi app

  1. New Tables
    - `users`
      - `wallet_address` (text, primary key) - The user's Solana wallet address
      - `username` (text) - User's display name
      - `profile_image_url` (text) - URL to the user's profile image
      - `wins` (integer) - Number of winning wagers
      - `losses` (integer) - Number of losing wagers
      - `profit_amount` (float) - Total profit in SOL
      - `created_at` (timestamptz) - When the user account was created
      - `updated_at` (timestamptz) - When the user account was last updated
  
  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read all user data
    - Add policy for users to update only their own data
*/

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  wallet_address TEXT PRIMARY KEY,
  username TEXT,
  profile_image_url TEXT,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  profit_amount FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read all user data
CREATE POLICY "Anyone can view users"
  ON users
  FOR SELECT
  USING (true);

-- Create policy for users to insert their own data
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

-- Create policy for users to update only their own data
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