// Browser-compatible IP address getter
const getPublicIp = () => {
  return 'localhost'; // You can change this to your actual IP if needed
};

import { createClient, SupabaseClient } from '@supabase/supabase-js'; 
 

const IP_ADDRESS = getPublicIp();

const supabaseUrl = `http://${IP_ADDRESS}:54321`;

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
