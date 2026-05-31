import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'SerenityHub App',
          short_name: 'SerenityHub',
          theme_color: '#333',
          background_color: '#ffffff',
          display: 'standalone',
          orientation:"portrait",
          scope:'/',
          start_url:'/',
          icons:[
            {
              src: "/logo_512.jpg",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: new RegExp('https://.{0,3}tile.openstreetmap.org'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'openstreetmap-tiles',
              },
            },
            {
              urlPattern: 'https://backend-serenityhub-production.up.railway.app:5500',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'serenitylink-image',
              },
              
            },
            {
              urlPattern: new RegExp('^https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'marker',
              },
              
            },
           
          ],
        },
      }),
    ],
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 150,
    },
  };
});
