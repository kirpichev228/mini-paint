import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyC2SYBFW2dsCFOlSjVO4zpEN9xc46Ajjcg',
  authDomain: 'mini-paint-29694.firebaseapp.com',
  projectId: 'mini-paint-29694',
  storageBucket: 'mini-paint-29694.appspot.com',
  messagingSenderId: '908399605853',
  appId: '1:908399605853:web:706f18a011dace5c2535b4',
  databaseURL: 'https://mini-paint-29694-default-rtdb.europe-west1.firebasedatabase.app'
}

export const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
export const db = getFirestore(app)
export const realtimeDB = getDatabase(app)
