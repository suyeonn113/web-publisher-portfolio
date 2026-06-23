import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link, useParams } from 'react-router-dom'
import ReadingBlockEditor from '../components/ReadingBlockEditor'
import { createReadingBlock, readingBlockTypes } from '../data/readingBlockTypes'
import {
  getLibraryBookDetail,
  updateLibraryBookMeta,
} from '../services/libraryService'
import {
  deleteReadingBlock,
  getReadingBlocks,
  getReadingLog,
  saveReadingLog,
} from '../services/readingLogService'

function BookDetail({ user }) {
  const { personalBookId } = useParams()
  const [libraryItem, setLibraryItem] = useState(null)
  const [log, setLog] = useState({ body: '' })
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadBookLog() {
      setIsLoading(true)
      setMessage('')

      try {
        const [bookDetail, savedLog, savedBlocks] = await Promise.all([
          getLibraryBookDetail(user, personalBookId),
          getReadingLog(user, personalBookId),
          getReadingBlocks(user, personalBookId),
        ])

        setLibraryItem(bookDetail)
        setLog({ body: savedLog.body || '' })
        setBlocks(savedBlocks)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookLog()
  }, [personalBookId, user])

  const handleAddBlock = (type) => {
    setBlocks((current) => [...current, createReadingBlock(type)])
  }

  const handleBlockChange = (blockId, fieldName, value) => {
    setBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? {
              ...block,
              fields: {
                ...block.fields,
                [fieldName]: value,
              },
            }
          : block,
      ),
    )
  }

  const handleDeleteBlock = async (block) => {
    setBlocks((current) => current.filter((item) => item.id !== block.id))

    if (!block.isNew) {
      await deleteReadingBlock(block.id)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')

    try {
      await Promise.all([
        saveReadingLog(user, personalBookId, log, blocks),
        updateLibraryBookMeta(personalBookId, {
          status: libraryItem.status,
          readDate: libraryItem.readDate || null,
        }),
      ])
      setBlocks((current) => current.map((block) => ({ ...block, isNew: false })))
      setMessage('Saved.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSaving(false)
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
            {isFinished ? '완독' : '미완독'}
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
        <textarea
          value={log.body}
          rows="8"
          placeholder="Write freely..."
          onChange={(event) =>
            setLog((current) => ({
              ...current,
              body: event.target.value,
            }))
          }
        />

        <div className="block-picker">
          {readingBlockTypes.map((blockType) => (
            <button
              type="button"
              key={blockType.type}
              onClick={() => handleAddBlock(blockType.type)}
            >
              <Icon icon={blockType.icon} width="18" height="18" />
              {blockType.label}
            </button>
          ))}
        </div>

        <div className="log-block-list">
          {blocks.map((block) => (
            <ReadingBlockEditor
              key={block.id}
              block={block}
              onChange={handleBlockChange}
              onDelete={handleDeleteBlock}
            />
          ))}
        </div>
      </section>

      {message && <p className="library-message">{message}</p>}

      <button
        type="button"
        className="save-log-button"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving' : 'Save'}
      </button>
    </section>
  )
}

export default BookDetail
