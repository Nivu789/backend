"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextMessageInput = exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
function sendMessage(data) {
    var config = {
        method: 'POST',
        url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    return (0, axios_1.default)(config);
}
exports.sendMessage = sendMessage;
function getTextMessageInput(recipient, text) {
    console.log("REsipient", recipient);
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        "template": {
            "name": "hello_world",
            "language": {
                "code": "en_US"
            }
        }
    });
}
exports.getTextMessageInput = getTextMessageInput;
