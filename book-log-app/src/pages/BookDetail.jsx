import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BookLogEditor from '../components/BookLogEditor'
import { useToast } from '../components/ToastProvider'
import {
  deleteLibraryBook,
  getLibraryBookDetail,
  updateLibraryBookMeta,
} from '../services/libraryService'
import {
  getReadingLog,
  saveReadingLog,
} from '../services/readingLogService'

const FINISHED_LABEL = '\uC644\uB3C5'
const UNFINISHED_LABEL = '\uBBF8\uC644\uB3C5'

function BookDetail({ user }) {
  const { personalBookId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [libraryItem, setLibraryItem] = useState(null)
  const [log, setLog] = useState({ body: '', contentJson: null })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadBookLog() {
      setIsLoading(true)
      setMessage('')

      try {
        const [bookDetail, savedLog] = await Promise.all([
          getLibraryBookDetail(user, personalBookId),
          getReadingLog(user, personalBookId),
        ])

        setLibraryItem(bookDetail)
        setLog({
          body: savedLog.body || '',
          contentJson: savedLog.contentJson || null,
        })
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookLog()
  }, [personalBookId, user])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')

    try {
      await Promise.all([
        saveReadingLog(user, personalBookId, log),
        updateLibraryBookMeta(personalBookId, {
          status: libraryItem.status,
          readDate: libraryItem.readDate || null,
        }),
      ])
      showToast('Saved')
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setMessage('')

    try {
      await deleteLibraryBook(personalBookId)
      showToast('Deleted')
      navigate('/')
    } catch (error) {
      showToast(error.message)
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <p className="library-message">Loading...</p>
  }

  if (!libraryItem) {
    return <p className="library-message">{message}</p>
  }

  const book = libraryItem.book
  const isFinished = libraryItem.status === 'finished'

  return (
    <section className="book-detail-page">
      <header className="book-log-header">
        <Link className="back-link" to="/">
          Back
        </Link>

        <div className="book-log-actions">
          <label className="read-date-text">
            <span>Read date</span>
            <input
              type="date"
              value={libraryItem.readDate || ''}
              onChange={(event) =>
                setLibraryItem((current) => ({
                  ...current,
                  readDate: event.target.value,
                }))
              }
            />
          </label>

          <button
            type="button"
            className="status-text-button"
            onClick={() =>
              setLibraryItem((current) => ({
                ...current,
                status: isFinished ? 'unfinished' : 'finished',
              }))
            }
          >
            {isFinished ? FINISHED_LABEL : UNFINISHED_LABEL}
          </button>
        </div>
      </header>

      <header className="book-detail-header">
        <div className="book-detail-cover">
          {book?.thumbnail ? <img src={book.thumbnail} alt="" /> : <span>No cover</span>}
        </div>
        <div className="book-detail-info">
          <h1>{book?.title || 'Untitled'}</h1>
          <p>{book?.author || '-'}</p>
          <p>{book?.publisher || '-'}</p>
        </div>
      </header>

      <section className="writing-editor">
        <BookLogEditor log={log} onChange={setLog} />
      </section>

      <button
        type="button"
        className="save-log-button"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving' : 'Save'}
      </button>

      <button
        type="button"
        className="delete-book-button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting' : 'Delete'}
      </button>
    </section>
  )
}

export default BookDetail
