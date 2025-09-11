-- SQL Commands to manually add users to Supabase auth.users table
-- Use these commands in your Supabase SQL Editor

-- Method 1: Insert user directly into auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- instance_id (use default)
  gen_random_uuid(), -- id (auto-generate UUID)
  'authenticated', -- aud
  'authenticated', -- role
  'user@example.com', -- email (CHANGE THIS)
  crypt('password123', gen_salt('bf')), -- encrypted_password (CHANGE PASSWORD)
  now(), -- email_confirmed_at (confirms email immediately)
  now(), -- created_at
  now(), -- updated_at
  '', -- confirmation_token
  '', -- recovery_token
  '', -- email_change_token_new
  '' -- email_change
);

-- Method 2: Using Supabase's built-in function (if available)
-- This is safer and handles encryption automatically
SELECT auth.signup(
  email := 'user@example.com', -- CHANGE THIS EMAIL
  password := 'password123' -- CHANGE THIS PASSWORD
);

-- Method 3: Batch insert multiple users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) VALUES 
  (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@als.com', -- Admin user
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'teacher1@als.com', -- Teacher user
    crypt('teacher123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'student1@als.com', -- Student user
    crypt('student123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', '', '', ''
  );

-- Method 4: Create a function for easier user creation
CREATE OR REPLACE FUNCTION create_user(
  user_email TEXT,
  user_password TEXT
)
RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  new_user_id := gen_random_uuid();
  
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '', '', '', ''
  );
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;

-- Use the function like this:
-- SELECT create_user('newuser@example.com', 'newpassword123');

-- To view all users:
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- To delete a user (if needed):
-- DELETE FROM auth.users WHERE email = 'user@example.com';

-- Note: Replace the following with your actual user details:
-- - user@example.com → actual email address
-- - password123 → actual password (make it strong!)
-- 
-- Important: 
-- 1. Run these commands in your Supabase SQL Editor
-- 2. Go to: Supabase Dashboard → Your Project → SQL Editor
-- 3. Paste the command and click "Run"
-- 4. Users will be able to login immediately with their email/password
