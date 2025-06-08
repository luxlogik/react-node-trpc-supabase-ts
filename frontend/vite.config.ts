import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { readFileSync, existsSync } from 'fs';
import os from 'os';

// Get number of CPU cores, but leave one core free for system
const numCPUs = Math.max(1, os.cpus().length - 1);

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
      '@generated': path.resolve(__dirname, './src/generated'),
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
    host: '0.0.0.0',
    port: 3000,
    // Optimize file watching for limited resources
    watch: {
      usePolling: false, // Disable polling to reduce CPU usage
      interval: 1000, // Increase interval to reduce frequency
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/coverage/**',
        '**/.nyc_output/**',
        '**/tmp/**',
        '**/temp/**'
      ]
    },
    // Optimize HMR
    hmr: {
      overlay: false, // Disable error overlay to save memory
      clientPort: 3000 // Explicit port to prevent conflicts
    },
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
    // Optimize for t3.medium CPU
    rollupOptions: {
      maxParallelFileOps: numCPUs, // Use available CPU cores
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
          ],
          'utils-vendor': ['date-fns', 'zod', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV === 'development',
    // Use esbuild for faster builds
    minify: 'esbuild',
    target: 'esnext',
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'react-router-dom',
    ],
    exclude: [
      '@improbable-eng/grpc-web',
      'grpc-tools',
      'google-protobuf',
    ],
    // Force re-optimization less frequently
    force: false,
  },
  // Optimize esbuild for t3.medium
  esbuild: {
    target: 'esnext',
    supported: {
      'top-level-await': true,
    },
    // Optimize for memory usage
    keepNames: false,
    // Disable some transformations to save CPU
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  // Reduce memory usage
  define: {
    // Disable some dev features to save memory
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    // Make public IP available as a global variable
    __PUBLIC_IP__: JSON.stringify(getPublicIp()),
  },
});