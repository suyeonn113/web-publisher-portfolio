import { useState } from 'react'
import { signOut, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useToast } from '../components/ToastProvider'
import { auth, db } from '../firebase/firebase'

function MyPage({ user }) {
  const { showToast } = useToast()
  const [nickname, setNickname] = useState(user.displayName || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (event) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      const trimmedNickname = nickname.trim()

      await updateProfile(user, {
        displayName: trimmedNickname,
      })

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: trimmedNickname,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )

      setNickname(trimmedNickname)
      showToast('Saved')
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <section className="my-page">
      <h1>My page</h1>

      <form className="profile-form" onSubmit={handleSave}>
        <label>
          <span>Nickname</span>
          <input
            type="text"
            value={nickname}
            placeholder="Nickname"
            onChange={(event) => setNickname(event.target.value)}
          />
        </label>

        <label>
          <span>Email</span>
          <input type="email" value={user.email || ''} readOnly />
        </label>

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving' : 'Save'}
        </button>
      </form>

      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  )
}

export default MyPage
