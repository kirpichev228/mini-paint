import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '@/firebase/index'

class AuthService {
  async login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
    return auth.currentUser
  }

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
    return auth.currentUser
  }

  async logout() {
    await signOut(auth)
  }

  async fetchUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }
}

const authService = new AuthService()

export default authService
