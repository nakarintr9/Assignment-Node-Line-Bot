// Reply with two static messages
let token = 'fybw/Xp3kEkMfUSlcRCKPoHeK2/YMYimUdQlE1kMOjx01uOXdr8CRtwycAIklC5PEryi+OLrdBhsJFcB3004QOIA+R3JWXa4uoDPFFNTqi1X2Pn8ydTrKtPlfqdGxgyIcUSJ4KHtBz3UeDzvHKeoWwdB04t89/1O/w1cDnyilFU=';
// Echo reply

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}