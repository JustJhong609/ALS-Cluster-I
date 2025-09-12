-- SQL Commands to add the specific ALS District users
-- Updated for Project URL: https://certnmtfowqvnoajwlgx.supabase.co
-- 
-- IMPORTANT: The auth schema might not be accessible via SQL Editor
-- Try the Dashboard method first (see METHOD 1 below)

-- Step 1: Database diagnostics - Run these first to understand the structure
SELECT current_database();
SELECT current_user;

-- Check what schemas exist
SELECT schema_name FROM information_schema.schemata ORDER BY schema_name;

-- Check if auth schema is accessible
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
ORDER BY table_name;

-- Check available extensions
SELECT name, installed_version 
FROM pg_available_extensions 
WHERE name IN ('pgcrypto', 'uuid-ossp') 
ORDER BY name;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Test if we can access auth.users (this might fail)
-- If this query fails, the auth schema is restricted
DO $$
BEGIN
    -- Try to query auth.users
    PERFORM 1 FROM auth.users LIMIT 1;
    RAISE NOTICE 'AUTH SCHEMA ACCESS: Success - can access auth.users';
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'AUTH SCHEMA ACCESS: Failed - insufficient privileges';
    WHEN undefined_table THEN
        RAISE NOTICE 'AUTH SCHEMA ACCESS: Failed - auth.users table does not exist';
    WHEN others THEN
        RAISE NOTICE 'AUTH SCHEMA ACCESS: Failed - %', SQLERRM;
END $$;

-- Step 3: Alternative - Create our own user management table
-- This is a fallback if auth schema is not accessible
CREATE TABLE IF NOT EXISTS public.district_users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password_hash text NOT NULL,
    district text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_active boolean DEFAULT true
);

-- Insert district users into our custom table
INSERT INTO public.district_users (email, password_hash, district) 
VALUES 
    ('ManoloDistrict@gmail.com', crypt('ManoloDistrict12345', gen_salt('bf')), 'Manolo Fortich'),
    ('MalitbogDistrict@gmail.com', crypt('MalitbogDistrict12345', gen_salt('bf')), 'Malitbog'),
    ('LibonaDistrict@gmail.com', crypt('LibonaDistrict12345', gen_salt('bf')), 'Libona'),
    ('BaungonDistrict@gmail.com', crypt('BaungonDistrict12345', gen_salt('bf')), 'Baungon')
ON CONFLICT (email) DO UPDATE SET 
    updated_at = now(),
    is_active = true;

-- Verify our custom table
SELECT id, email, district, created_at, is_active 
FROM public.district_users 
ORDER BY email;

-- Step 4: Try direct auth.users insertion (might fail due to permissions)
-- Only run this if the diagnostic query above succeeded
DO $$
BEGIN
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
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
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
        '{"provider": "email", "providers": ["email"]}',
        '{"district": "Manolo Fortich"}',
        false,
        '',
        '',
        '',
        ''
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
        '{"provider": "email", "providers": ["email"]}',
        '{"district": "Malitbog"}',
        false,
        '',
        '',
        '',
        ''
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
        '{"provider": "email", "providers": ["email"]}',
        '{"district": "Libona"}',
        false,
        '',
        '',
        '',
        ''
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
        '{"provider": "email", "providers": ["email"]}',
        '{"district": "Baungon"}',
        false,
        '',
        '',
        '',
        ''
    );
    
    RAISE NOTICE 'Successfully inserted users into auth.users';
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Failed to insert into auth.users: %', SQLERRM;
END $$;

-- Step 5: Verify results
-- Check if auth.users insertion worked
DO $$
BEGIN
    PERFORM 1 FROM auth.users WHERE email = 'ManoloDistrict@gmail.com';
    IF FOUND THEN
        RAISE NOTICE 'SUCCESS: Users found in auth.users table';
        -- Show the users
        FOR rec IN 
            SELECT id, email, created_at, raw_user_meta_data
            FROM auth.users
            WHERE email IN (
                'ManoloDistrict@gmail.com',
                'MalitbogDistrict@gmail.com', 
                'LibonaDistrict@gmail.com',
                'BaungonDistrict@gmail.com'
            )
            ORDER BY email
        LOOP
            RAISE NOTICE 'User: % | ID: % | Created: %', rec.email, rec.id, rec.created_at;
        END LOOP;
    ELSE
        RAISE NOTICE 'INFO: No users found in auth.users - using fallback table';
    END IF;
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Cannot access auth.users: %', SQLERRM;
END $$;

-- Always show our fallback table results
SELECT 'FALLBACK TABLE RESULTS:' as info;
SELECT id, email, district, created_at, is_active 
FROM public.district_users 
ORDER BY email;

-- Test connection table
CREATE TABLE IF NOT EXISTS public.test_connection (
    id SERIAL PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.test_connection (message) 
VALUES ('Database connection test - ' || now()::text);

SELECT 'CONNECTION TEST:' as info;
SELECT * FROM public.test_connection ORDER BY created_at DESC LIMIT 1;

/*
================================================================================
RECOMMENDED APPROACH - Use Supabase Dashboard (METHOD 1)
================================================================================

Since the auth schema may be restricted in the SQL Editor, use the dashboard:

1. Go to: https://certnmtfowqvnoajwlgx.supabase.co/project/certnmtfowqvnoajwlgx/auth/users

2. Click "Add user" and create each user manually:

   User 1: 
   - Email: ManoloDistrict@gmail.com
   - Password: ManoloDistrict12345
   - Email confirmation: Skip (or confirm immediately)

   User 2:
   - Email: MalitbogDistrict@gmail.com  
   - Password: MalitbogDistrict12345

   User 3:
   - Email: LibonaDistrict@gmail.com
   - Password: LibonaDistrict12345

   User 4: 
   - Email: BaungonDistrict@gmail.com
   - Password: BaungonDistrict12345

3. After creating users in the dashboard, they will automatically appear in the auth.users table with proper constraints and relationships.

================================================================================
FALLBACK - Custom Authentication (METHOD 2)
================================================================================

If you cannot access the Supabase dashboard, the script above creates a 
'public.district_users' table that you can use for authentication by modifying 
your auth.js file to check this table instead of Supabase auth.

The passwords are properly hashed using bcrypt/crypt function.

================================================================================
*/