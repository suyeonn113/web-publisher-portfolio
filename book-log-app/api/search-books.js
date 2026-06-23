import { searchAladinBooks } from './aladinSearch.js'

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.status(204).end()
    return
  }

  if (request.method !== 'GET') {
    response.status(405).json({ message: 'Method not allowed' })
    return
  }

  const result = await searchAladinBooks(
    request.query.query,
    process.env.ALADIN_TTB_KEY,
  )

  response.status(result.status).json(result.body)
}
