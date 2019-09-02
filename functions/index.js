const admin = require('firebase-admin')
const serviceAccount = require('./keys/service-account.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://classsite-9148d.firebaseio.com',
})

exports.getRSSWOD = require('./src/getRSSWOD').getRSSWOD
