import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDk28t5fNrkUo9Fg3U_rbdbcnotA4-VAxs',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'disneyplus-clone-60f48.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'disneyplus-clone-60f48',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'disneyplus-clone-60f48.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '1065335473434',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:1065335473434:web:a781cb739db1846d0198a3',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-Q6GE55Q66N'
}

let firebaseApp
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.app()
}

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider, storage }
export default db
