let channelAccessToken =
  "XQ+Flk5yQfoS1X/FBErKW56urAMk5yFVRh1/7Y+L5fhHfAoPMWrxr1e4DI9R+Ln1Qis3vsKLAY9e8y7fL9Gn+PPkmCYPUY8PuGa/SOxdfflt0FSV61oQ4r40z+4JQQ6oVaNrOrOSEwtTTFbgo1Q7GgdB04t89/1O/w1cDnyilFU=";
let lineNotifyToken = "b7kDjPeENr8QwOvb8lkU6Q8enmUwPZouClJNXyk4bk8";

// Reply using AIML, parsing data with AIMLParser
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;
  reply(reply_token, "echo: " + msg);
  res.sendStatus(200);
});

app.listen(port);

function reply(reply_token, msg) {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + channelAccessToken,
    };

    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [
        {
          type: "text",
          text: msg,
        },
      ],
    });

    request.post(
      {
        url: "https://api.line.me/v2/bot/message/reply",
        headers: headers,
        body: body,
      },
      (err, res, body) => {
        if(err) throw new Error(err);
        console.log("reply status = " + res.statusCode);
        if (err || res.statusCode !== 200) notify(msg);
        //simulate error
        notify("simulate fail when line bot try to send message: "+msg);
      }
    );
  } catch (error) {
    console.log("reply catch = " + error);
  }
}

function notify(message) {
  try {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + lineNotifyToken,
    };
    request.post(
      {
        uri: "https://notify-api.line.me/api/notify",
        headers: headers,
        form: {
          message: message,
        },
      },
      (err, res, body) => {
        if(err) throw new Error(err);
        console.log("norify status = " + res.statusCode);
      }
    );
  } catch (error) {
    console.log("notify catch = " + error);
  }
}
