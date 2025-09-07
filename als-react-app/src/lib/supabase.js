import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types (adjust based on your Supabase tables)
export const tables = {
  ANNOUNCEMENTS: 'announcements',
  TEACHERS: 'teachers', 
  MATERIALS: 'materials',
  CONTACTS: 'contacts',
  PASSERS: 'passers'
}
