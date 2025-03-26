import axios from "axios";

export function sendMessage(data:any) {
  var config = {
    method: 'POST',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

export function getTextMessageInput(recipient:string, text:string) {
    console.log("REsipient",recipient)
    return JSON.stringify({
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": recipient,
      "type": "template",
      "template": {
          "name": "hello_world",
          "language":{
            "code":"en_US"
          }
      }
    });
}

