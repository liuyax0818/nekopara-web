import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const staticWorker = (): Plugin => ({
  name: 'static-worker-entry',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'server/index.js',
      source: `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') return response

    const fallbackUrl = new URL('/index.html', request.url)
    return env.ASSETS.fetch(new Request(fallbackUrl, request))
  },
}\n`,
    })
  },
})

export default defineConfig({
  plugins: [vue(), staticWorker()],
})
