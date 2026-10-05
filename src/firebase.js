import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDk28t5fNrkUo9Fg3U_rbdbcnotA4-VAxs',
  authDomain: 'disneyplus-clone-60f48.firebaseapp.com',
  projectId: 'disneyplus-clone-60f48',
  storageBucket: 'disneyplus-clone-60f48.appspot.com',
  messagingSenderId: '1065335473434',
  appId: '1:1065335473434:web:a781cb739db1846d0198a3',
  measurementId: 'G-Q6GE55Q66N'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider, storage }
export default db

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
