import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import { auth } from '@/firebase/index'

class AuthService {
  async login(email: string, password: string): Promise<User | null> {
    await signInWithEmailAndPassword(auth, email, password)
    return auth.currentUser
  }

  async register(email: string, password: string): Promise<User | null> {
    await createUserWithEmailAndPassword(auth, email, password)
    return auth.currentUser
  }

  async logout(): Promise<void> {
    await signOut(auth)
  }

  async fetchUser(): Promise<unknown> {
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
