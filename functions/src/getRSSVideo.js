const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fs = require('fs')
const http = require('http')
const fetch = require('node-fetch')
const cors = require('cors')({ origin: true })
const parseXML = require('xml2js').parseString
const rssURL = 'http://rss.cnn.com/services/podcasting/cnn10/rss.xml'

exports.getRSSVideo = functions.pubsub
    .schedule('0 6 * * *')
    .timeZone('America/Chicago')
    .onRun(async context => {
        try {
            const link = await fetch(rssURL)
                .then(res => res.text())
                .then(
                    text =>
                        new Promise((resolve, reject) => {
                            parseXML(text, (error, result) => {
                                if (error) {
                                    reject(error)
                                }

                                const link =
                                    result &&
                                    result.rss &&
                                    result.rss.channel &&
                                    result.rss.channel[0] &&
                                    result.rss.channel[0].item &&
                                    result.rss.channel[0].item[0] &&
                                    result.rss.channel[0].item[0].link &&
                                    result.rss.channel[0].item[0].link[0]

                                resolve(link)
                            })
                        })
                )
                .catch(error => {
                    throw error
                })

            const filePath = `/tmp/cnn10`

            const rssResponse = await fetch(link)

            const destination = fs.createWriteStream(filePath)
            const stream = rssResponse.body.pipe(destination)

            stream.on('finish', async () => {
                const bucket = admin
                    .storage()
                    .bucket('classsite-9148d.appspot.com')

                const fileName = `videos/cnn10.mp4`

                await bucket.upload(filePath, {
                    destination: fileName,
                    metadata: {
                        contentType: 'video/mp4',
                    },
                })
            })
        } catch (error) {
            console.error(error)
        }
    })
