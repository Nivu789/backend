"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
    },
    venue: {
        type: String
    },
    seats: {
        type: String
    },
    startDate: {
        type: Array
    },
    endDate: {
        type: Array
    },
    showInHome: {
        type: Boolean
    },
    activity: {
        type: String
    },
    img: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const EVENT = mongoose_1.default.model('events', eventSchema);
exports.default = EVENT;
