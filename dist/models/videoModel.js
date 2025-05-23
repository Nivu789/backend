"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
});
const Video = mongoose_1.default.model("Video", videoSchema);
exports.default = Video;
