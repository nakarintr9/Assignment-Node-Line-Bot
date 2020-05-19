
let channelAccessToken = 'XQ+Flk5yQfoS1X/FBErKW56urAMk5yFVRh1/7Y+L5fhHfAoPMWrxr1e4DI9R+Ln1Qis3vsKLAY9e8y7fL9Gn+PPkmCYPUY8PuGa/SOxdfflt0FSV61oQ4r40z+4JQQ6oVaNrOrOSEwtTTFbgo1Q7GgdB04t89/1O/w1cDnyilFU=';
let channelSecret= 'b3853aa0f59c1e65df1079e297477adb';
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: channelAccessToken,
  channelSecret: channelSecret
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);