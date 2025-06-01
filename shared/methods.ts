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
      return 'localhost';
    } catch (error) {
      console.warn('Failed to read .env.json, falling back to environment variable:', error);
    }
    
    // Fallback to environment variable or localhost
    return process.env['IP_ADDRESS'] || 'localhost';
  };