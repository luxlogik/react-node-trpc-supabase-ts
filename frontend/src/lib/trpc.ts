import { httpBatchLink } from '@trpc/client'; 
import { supabase } from './supabase';
import type { AppRouter } from '@/backend/src/routers/app_router';
import { createTRPCReact } from '@trpc/react-query';

import path from "path";
import fs from "fs";

// Function to get IP address from .env.json
export const getPublicIp = () => {
  try {
    // Try multiple possible locations for .env.json
    const possiblePaths = [
      // For development
      path.resolve(process.cwd(), '.env.json'),
      // For production build
      path.resolve(process.cwd(), 'public', '.env.json'),
      // For absolute path in EC2
      '/home/ec2-user/workspace/.env.json',
      // For relative to the current file
      path.resolve(__dirname, '../../.env.json'),
    ];

    for (const envPath of possiblePaths) {
      if (fs.existsSync(envPath)) {
        const envData = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
        if (envData.publicIp) {
          console.log(`Found .env.json at: ${envPath}`);
          return envData.publicIp;
        }
      }
    }
  } catch (error) {
    console.warn('Failed to read .env.json, falling back to environment variable:', error);
  }
   
  return 'localhost';
};

const IP_ADDRESS = getPublicIp();
const API_URL = `http://${IP_ADDRESS}:3001`;

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