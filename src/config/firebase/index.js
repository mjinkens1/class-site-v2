import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'classsite-9148d.firebaseapp.com',
    databaseURL: 'https://classsite-9148d.firebaseio.com',
    projectId: 'classsite-9148d',
    storageBucket: 'classsite-9148d.appspot.com',
    messagingSenderId: '577574019440',
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export const db = firebase.firestore()

export const storage = firebase.storage()
