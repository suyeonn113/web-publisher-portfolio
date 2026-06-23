import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

function getBookDocumentId(book) {
  return String(book.isbn13 || book.isbn || book.id).replace(/[/.#[\]]/g, '-')
}

export async function saveBookToMyLibrary(user, book) {
  const bookId = getBookDocumentId(book)
  const personalBookId = `${user.uid}_${bookId}`

  await setDoc(
    doc(db, 'books', bookId),
    {
      id: bookId,
      aladinId: book.id || '',
      title: book.title || '',
      author: book.author || '',
      publisher: book.publisher || '',
      thumbnail: book.thumbnail || '',
      description: book.description || '',
      isbn: book.isbn || '',
      isbn13: book.isbn13 || '',
      link: book.link || '',
      source: 'aladin',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  await setDoc(
    doc(db, 'personalBooks', personalBookId),
    {
      id: personalBookId,
      userId: user.uid,
      bookId,
      status: 'reading',
      rating: 0,
      syncEnabled: false,
      source: 'personal',
      viewType: 'cover',
      deletedAt: null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  return bookId
}

export async function getMyLibraryBooks(user) {
  const personalBooksQuery = query(
    collection(db, 'personalBooks'),
    where('userId', '==', user.uid),
    where('deletedAt', '==', null),
  )
  const personalBooksSnap = await getDocs(personalBooksQuery)
  const personalBooks = personalBooksSnap.docs.map((item) => item.data())

  const books = await Promise.all(
    personalBooks.map(async (libraryItem) => {
      const bookSnap = await getDoc(doc(db, 'books', libraryItem.bookId))
      return {
        ...libraryItem,
        book: bookSnap.exists() ? bookSnap.data() : null,
      }
    }),
  )

  return books
}
