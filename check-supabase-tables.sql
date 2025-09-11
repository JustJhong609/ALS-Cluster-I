-- SQL Commands to check existing Supabase tables
-- Run these in your Supabase SQL Editor to verify what's already available

-- 1. Check if auth schema and tables exist
SELECT schemaname, tablename, tableowner 
FROM pg_tables 
WHERE schemaname = 'auth'
ORDER BY tablename;

-- 2. Check the structure of auth.users table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'auth' AND table_name = 'users'
ORDER BY ordinal_position;

-- 3. Check if there are any existing users
SELECT COUNT(*) as total_users FROM auth.users;

-- 4. List all existing users (if any)
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at,
  role
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check authentication settings
SELECT * FROM auth.config;

-- If you get errors running the above, it means auth is not enabled.
-- In that case, you need to enable authentication in your Supabase dashboard:
-- 1. Go to Authentication → Settings
-- 2. Make sure "Enable email confirmations" is configured as needed
-- 3. Authentication should be enabled by default in new projects
