import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 4000,
    rolldownOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        codeSplitting: {
          groups: [
            {
              // 本地依赖拆包
              name: 'shared',
              test: /[\\/]packages[\\/]shared[\\/]/,
              priority: 10,
            },
            {
              // 第三方依赖拆包
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
          ],
        },
      },

    }
  }
})
