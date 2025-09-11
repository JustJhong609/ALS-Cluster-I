-- SQL Commands to add the specific ALS District users
-- Project URL: https://wqgtwawhychppihoeedf.supabase.co
-- Copy and paste this into your Supabase SQL Editor and run it

-- Direct insert method (auth.signup function not available)
-- This method directly inserts into the auth.users table
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
    'ManoloDistrict@gmail.com',
    crypt('ManoloDistrict12345', gen_salt('bf')),
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
    'MalitbogDistrict@gmail.com',
    crypt('MalitbogDistrict12345', gen_salt('bf')),
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
    'LibonaDistrict@gmail.com',
    crypt('LibonaDistrict12345', gen_salt('bf')),
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
    'BaungonDistrict@gmail.com',
    crypt('BaungonDistrict12345', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', '', '', ''
  );

-- Verify the users were created successfully
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users
WHERE email IN (
  'ManoloDistrict@gmail.com',
  'MalitbogDistrict@gmail.com',
  'LibonaDistrict@gmail.com',
  'BaungonDistrict@gmail.com'
)
ORDER BY email;

-- Summary of users to be added:
-- 1. ManoloDistrict@gmail.com    | Password: ManoloDistrict12345
-- 2. MalitbogDistrict@gmail.com  | Password: MalitbogDistrict12345
-- 3. LibonaDistrict@gmail.com    | Password: LibonaDistrict12345
-- 4. BaungonDistrict@gmail.com   | Password: BaungonDistrict12345
