"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gallerySchema = new mongoose_1.default.Schema({
    folderName: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date
    }
});
const GALLERY = mongoose_1.default.model('gallery', gallerySchema);
exports.default = GALLERY;
