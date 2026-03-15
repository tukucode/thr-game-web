import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', '@vueuse/core'],
      dirs: ['./src/composables', './src/stores', './src/utils'],
      dts: './src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['./src/components'],
      dts: './src/components.d.ts',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'source/ketupat.png', 'source/splash.png'],
      manifest: {
        name: 'Game THR - Kocok Amplop & Buka Kartu',
        short_name: 'Game THR',
        description: 'Cara seru bagi-bagi THR online dengan permainan interaktif!',
        theme_color: '#F3F1EF',
        background_color: '#F3F1EF',
        icons: [
          {
            src: 'source/ketupat.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'source/ketupat.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
