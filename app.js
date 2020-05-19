// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
let token = 'fybw/Xp3kEkMfUSlcRCKPoHeK2/YMYimUdQlE1kMOjx01uOXdr8CRtwycAIklC5PEryi+OLrdBhsJFcB3004QOIA+R3JWXa4uoDPFFNTqi1X2Pn8ydTrKtPlfqdGxgyIcUSJ4KHtBz3UeDzvHKeoWwdB04t89/1O/w1cDnyilFU=';
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
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