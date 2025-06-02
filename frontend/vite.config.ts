import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { readFileSync, existsSync } from 'fs';

// Function to get public IP for display
const getPublicIp = () => {
  try {
    const envPath = '/home/ec2-user/workspace/.env.json';
    if (existsSync(envPath)) {
      const envData = JSON.parse(readFileSync(envPath, 'utf-8'));
      return envData.publicIp;
    }
  } catch (error) {
    console.warn('Could not read public IP from .env.json', error);
  }
  return null;
};

// Plugin to customize startup message display
const publicIpPlugin = () => {
  return {
    name: 'public-ip-display',
    configureServer(server) {
      // Override Vite's default startup message
      const originalPrintUrls = server.printUrls;
      server.printUrls = function() {
        const publicIp = getPublicIp();
        const port = server.config.server.port || 3000;
        
        // Print custom URLs
        console.log('');
        
        if (publicIp) {
          console.log(`  \x1b[32m➜\x1b[0m  \x1b[1m\x1b[33mPublic:\x1b[0m  \x1b[4mhttp://${publicIp}:${port}/\x1b[0m`);
        } else {
          console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m   http://localhost:${port}/`);
        }
        
        console.log('');
        console.log('  \x1b[2mpress \x1b[1mh\x1b[0m\x1b[2m to show help\x1b[0m');
      };
    },
  };
};

export default defineConfig({
  plugins: [react(), publicIpPlugin()],
  base: '/', // This adds the /static/ prefix to all assets in production
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@context': path.resolve(__dirname, './src/context'),
      '@i18n': path.resolve(__dirname, './src/i18n'), 
      '@shared': path.resolve(__dirname, '../shared'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts'],
  },
  css: {
    postcss: {
      plugins: [postcssPlugin(), autoprefixer()],
    },
  },
  server: {
    host: process.env.VITE_HOST || '0.0.0.0',
    port: parseInt(process.env.VITE_PORT || '3000', 10),
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  define: {
    // Make public IP available as a global variable
    __PUBLIC_IP__: JSON.stringify(getPublicIp()),
  },
});