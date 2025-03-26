"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const announcementSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    published: {
        type: Date,
        default: new Date()
    },
    lastDate: {
        type: Date,
    },
    file: {
        type: String
    },
    showInHome: {
        type: Boolean
    }
});
const ANNOUNCEMENT = mongoose_1.default.model('announcement', announcementSchema);
exports.default = ANNOUNCEMENT;
