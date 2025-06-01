import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Context } from '@/server/context';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a client with service role key for auth operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a context-aware Supabase client
export const getContextClient = (ctx: Context) => {
  const token = ctx.req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error('No token provided in context');
  }
  return createClient(supabaseUrl, token);
}; 