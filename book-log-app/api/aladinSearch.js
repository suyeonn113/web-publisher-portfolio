const ALADIN_SEARCH_URL = 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx'

function normalizeBook(item) {
  return {
    id: item.itemId ? String(item.itemId) : item.isbn13 || item.isbn,
    title: item.title || '',
    author: item.author || '',
    publisher: item.publisher || '',
    thumbnail: item.cover || '',
    description: item.description || '',
    isbn: item.isbn || '',
    isbn13: item.isbn13 || '',
    pubDate: item.pubDate || '',
    link: item.link || '',
  }
}

export async function searchAladinBooks(query, ttbKey) {
  const keyword = String(query || '').trim()

  if (!keyword) {
    return { status: 400, body: { message: 'Query is required' } }
  }

  if (!ttbKey) {
    return { status: 500, body: { message: 'Aladin API key is missing' } }
  }

  const params = new URLSearchParams({
    ttbkey: ttbKey,
    Query: keyword,
    QueryType: 'Title',
    MaxResults: '10',
    start: '1',
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
    Cover: 'Big',
  })

  try {
    const aladinResponse = await fetch(`${ALADIN_SEARCH_URL}?${params}`)

    if (!aladinResponse.ok) {
      return {
        status: aladinResponse.status,
        body: { message: 'Aladin API request failed' },
      }
    }

    const data = await aladinResponse.json()
    const books = Array.isArray(data.item) ? data.item.map(normalizeBook) : []

    return { status: 200, body: { books } }
  } catch (error) {
    return {
      status: 500,
      body: {
        message: 'Failed to search books',
        detail: error instanceof Error ? error.message : String(error),
      },
    }
  }
}
