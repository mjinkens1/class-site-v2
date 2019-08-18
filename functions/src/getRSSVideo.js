const functions = require('firebase-functions')
const fetch = require('node-fetch')
const cors = require('cors')({ origin: true })
const parseXML = require('xml2js').parseString
const rssURL = 'http://rss.cnn.com/services/podcasting/cnn10/rss.xml'

exports.getRSSVideo = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        fetch(rssURL)
            .then(res => res.text())
            .then(text =>
                parseXML(text, (error, result) => {
                    if (error) throw new Error(error)

                    const link =
                        result &&
                        result.rss &&
                        result.rss.channel &&
                        result.rss.channel[0] &&
                        result.rss.channel[0].item &&
                        result.rss.channel[0].item[0] &&
                        result.rss.channel[0].item[0].link &&
                        result.rss.channel[0].item[0].link[0]

                    return response.send(JSON.stringify(link))
                })
            )
            .catch(error => response.send(error))
    })
})
