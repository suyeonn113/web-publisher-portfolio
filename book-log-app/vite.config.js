import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { searchAladinBooks } from './api/aladinSearch.js'

function localApiPlugin(ttbKey) {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/search-books', async (request, response) => {
        const url = new URL(request.url, 'http://localhost')
        const result = await searchAladinBooks(
          url.searchParams.get('query'),
          ttbKey,
        )

        response.statusCode = result.status
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(result.body))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), localApiPlugin(env.ALADIN_TTB_KEY)],
  }
})
