const functions = require('firebase-functions')
const fetch = require('node-fetch')
const rssURL = 'http://rss.cnn.com/services/podcasting/cnn10/rss.xml'

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.getRSS = functions.https.onRequest((request, response) => {
    fetch(rssURL)
        .then(res => {
            console.log('res', res.body)
            return response.send(res.body)
        })
        .catch(error => response.send('error'))
})
