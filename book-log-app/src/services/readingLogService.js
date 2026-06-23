import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

function getLogId(user, personalBookId) {
  return `${user.uid}_${personalBookId}`
}

export async function getReadingLog(user, personalBookId) {
  const logSnap = await getDoc(doc(db, 'readingLogs', getLogId(user, personalBookId)))

  return logSnap.exists()
    ? logSnap.data()
    : {
        body: '',
        contentJson: null,
      }
}

export async function getReadingBlocks(user, personalBookId) {
  const blocksQuery = query(
    collection(db, 'readingBlocks'),
    where('userId', '==', user.uid),
    where('personalBookId', '==', personalBookId),
  )
  const blocksSnap = await getDocs(blocksQuery)

  return blocksSnap.docs
    .map((item) => item.data())
    .sort((a, b) => a.order - b.order)
}

export async function saveReadingLog(user, personalBookId, log, blocks = []) {
  await setDoc(
    doc(db, 'readingLogs', getLogId(user, personalBookId)),
    {
      id: getLogId(user, personalBookId),
      userId: user.uid,
      personalBookId,
      body: log.body,
      contentJson: log.contentJson || null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  await Promise.all(
    blocks.map((block, index) =>
      setDoc(
        doc(db, 'readingBlocks', block.id),
        {
          id: block.id,
          userId: user.uid,
          personalBookId,
          type: block.type,
          fields: block.fields,
          order: index,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true },
      ),
    ),
  )
}

export async function deleteReadingBlock(blockId) {
  await deleteDoc(doc(db, 'readingBlocks', blockId))
}
