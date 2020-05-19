
let channelAccessToken = 'fybw/Xp3kEkMfUSlcRCKPoHeK2/YMYimUdQlE1kMOjx01uOXdr8CRtwycAIklC5PEryi+OLrdBhsJFcB3004QOIA+R3JWXa4uoDPFFNTqi1X2Pn8ydTrKtPlfqdGxgyIcUSJ4KHtBz3UeDzvHKeoWwdB04t89/1O/w1cDnyilFU=';
let channelSecret= '1d0c66301e63dda05ab05361844d7b62';
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