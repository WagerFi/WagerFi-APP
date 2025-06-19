-- Add win and loss streak columns to users table
-- Migration: 20250102130000_add_user_streaks.sql

-- Add streak columns to users table
ALTER TABLE users 
ADD COLUMN win_streak INTEGER DEFAULT 0,
ADD COLUMN loss_streak INTEGER DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN users.win_streak IS 'Current consecutive wins streak';
COMMENT ON COLUMN users.loss_streak IS 'Current consecutive losses streak';

-- Update existing users to have 0 streaks (they already default to 0)
UPDATE users SET win_streak = 0, loss_streak = 0 WHERE win_streak IS NULL OR loss_streak IS NULL; 