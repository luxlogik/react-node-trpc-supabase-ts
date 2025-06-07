import ipConfig from '../ip_address.json';

import { createClient, SupabaseClient } from '@supabase/supabase-js'; 
 

const getSupabaseUrl = () => {

  const hostname = ipConfig.this_machine_ip;

  return `http://${hostname}:54321`;
};

const supabaseUrl = getSupabaseUrl();

const supabaseAnonKey = 'whatever';

// Create a singleton instance of the Supabase client
let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

export const supabase: SupabaseClient = getSupabaseClient();

export const supabaseClient = supabase;
