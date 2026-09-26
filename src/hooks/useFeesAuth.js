import { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase.js'

const ALLOWED_ROLES = ['teacher', 'admin', 'sysadmin']

export function useFeesAuth() {
  const [user,    setUser]    = useState(undefined) // undefined = still resolving
  const [role,    setRole]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, async fbUser => {
      if (!fbUser) {
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid))
        setUser(fbUser)
        setRole(snap.exists() ? snap.data().role : 'denied')
      } catch (err) {
        setError(err.message)
        setRole('denied')
      } finally {
        setLoading(false)
      }
    })
  }, [])

  async function signIn() {
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError(err.message)
    }
  }

  async function signOut() {
    await fbSignOut(auth)
    setUser(null)
    setRole(null)
  }

  return {
    user,
    role,
    loading,
    error,
    allowed: ALLOWED_ROLES.includes(role),
    signIn,
    signOut,
  }
}
