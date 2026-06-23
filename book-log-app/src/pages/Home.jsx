import { useEffect, useState } from 'react'
import { getMyLibraryBooks } from '../services/libraryService'

function Home({ user }) {
  const [libraryBooks, setLibraryBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [viewType, setViewType] = useState('thumbnail')

  useEffect(() => {
    async function loadLibrary() {
      setIsLoading(true)
      setMessage('')

      try {
        const books = await getMyLibraryBooks(user)
        setLibraryBooks(books)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadLibrary()
  }, [user])

  const isTextView = viewType === 'text'

  return (
    <section className="home-page">
      <div className="home-toolbar">
        <button
          type="button"
          className="view-toggle-button"
          onClick={() => setViewType(isTextView ? 'thumbnail' : 'text')}
        >
          {isTextView ? '썸네일형' : '텍스트형'}
        </button>
      </div>

      {isLoading && <p className="library-message">Loading...</p>}
      {message && <p className="library-message">{message}</p>}
      {!isLoading && !message && libraryBooks.length === 0 && (
        <p className="library-message">Library에서 책을 검색해 추가해보세요.</p>
      )}

      <div className={`saved-book-list saved-book-list--${viewType}`}>
        {libraryBooks.map((item) => (
          <article className="saved-book-card" key={item.id}>
            {!isTextView && (
              <div className="saved-book-cover">
                {item.book?.thumbnail ? (
                  <img src={item.book.thumbnail} alt="" />
                ) : (
                  <span>No cover</span>
                )}
              </div>
            )}
            <div className="saved-book-info">
              <h3>{item.book?.title || 'Untitled'}</h3>
              <p>{item.book?.author || '-'}</p>
              <p>{item.book?.publisher || '-'}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home
