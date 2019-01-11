import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyBB_rPut6fHT-gYeSSU3BUJvCRwwsd9qgw',
    authDomain: 'classsite-9148d.firebaseapp.com',
    databaseURL: 'https://classsite-9148d.firebaseio.com',
    projectId: 'classsite-9148d',
    storageBucket: 'classsite-9148d.appspot.com',
    messagingSenderId: '577574019440',
}

firebase.initializeApp(config)

export const firestore = firebase.firestore

export const auth = firebase.auth()

export const db = firebase.firestore()

export const messaging = firebase.messaging()

export const storage = firebase.storage()

const settings = { timestampsInSnapshots: true } //must be set to prevent errors from deprecation of the way firebase currently sets timestamps

db.settings(settings)

// create and export variables for the various DB documents we want to access