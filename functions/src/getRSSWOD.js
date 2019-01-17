const functions = require('firebase-functions')
const fetch = require('node-fetch')
const cors = require('cors')({ origin: true })
const parseXML = require('xml2js').parseString
const rssURL = 'https://wordsmith.org/awad/rss1.xml'


exports.getRSSWOD = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        fetch(rssURL)
            .then(res => res.text())
            .then(text =>
                parseXML(text, (error, result) => {
                    if (error)
                        throw new Error(error);
                    const wod = result && result.rss && result.rss.channel && result.rss.channel[0] && result.rss.channel[0].item && result.rss.channel[0].item[0]

                    return response.send(JSON.stringify(wod))
                })
            )
            .catch(error => response.send(error))
    })
})