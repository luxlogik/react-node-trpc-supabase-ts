import { httpBatchLink } from '@trpc/client'; 
import { supabase } from './supabase';
import type { AppRouter } from '@/backend/src/routers/app_router';
 
import {   createTRPCReact } from '@trpc/react-query';
const API_URL = 'http://localhost:3001';

export const trpc = createTRPCReact<AppRouter>()

const trpcLinks = [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
      async headers() {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Only include authorization header if we have a valid session with an access token
        if (session?.access_token) {
          return {
            authorization: `Bearer ${session.access_token}`,
          };
        }
        
        // Return empty headers if no valid session
        return {};
      },
    }),
  ];
 

export const trpcClient = trpc.createClient({
  links: trpcLinks,
});