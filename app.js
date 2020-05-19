
let channelAccessToken = 'XQ+Flk5yQfoS1X/FBErKW56urAMk5yFVRh1/7Y+L5fhHfAoPMWrxr1e4DI9R+Ln1Qis3vsKLAY9e8y7fL9Gn+PPkmCYPUY8PuGa/SOxdfflt0FSV61oQ4r40z+4JQQ6oVaNrOrOSEwtTTFbgo1Q7GgdB04t89/1O/w1cDnyilFU=';
let channelSecret= '1d0c66301e63dda05ab05361844d7b62';

// Reply using AIML, parsing data with AIMLParser
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 4000
const aimlParser = new AIMLParser({ name:'Test'})

aimlParser.load(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    aimlParser.getResult(msg, (answer, wildCardArray, input) => {
        if(!answer) answer=msg
        console.log(answer)
        reply(reply_token, answer)
    })
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+channelAccessToken
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