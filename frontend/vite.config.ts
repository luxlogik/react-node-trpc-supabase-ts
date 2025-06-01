import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

// Function to get public IP for display
const getPublicIp = () => {
  try {
    const fs = require('fs');
    const envPath = '/home/ec2-user/workspace/.env.json';
    if (fs.existsSync(envPath)) {
      const envData = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
      return envData.publicIp;
    }
  } catch (error) {
    console.warn('Could not read public IP from .env.json');
  }
  return null;
};

// Plugin to show public IP in startup message
const publicIpPlugin = () => {
  return {
    name: 'public-ip-display',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        next();
      });
      
      const originalListen = server.listen;
      server.listen = function(...args) {
        const result = originalListen.apply(this, args);
        
        // Add a small delay to show after Vite's default message
        setTimeout(() => {
          const publicIp = getPublicIp();
          if (publicIp) {
            const port = server.config.server.port || 3000;
            console.log(`  ➜  \x1b[36mPublic:\x1b[0m  http://${publicIp}:${port}/`);
          }
        }, 100);
        
        return result;
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
      '@generated': path.resolve(__dirname, './src/generated'),
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
