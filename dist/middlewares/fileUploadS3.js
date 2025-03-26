"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadS3 = void 0;
const { S3Client } = require('@aws-sdk/client-s3');
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const fileUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'samskrithibucket',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            console.log("ddsdsd");
            cb(null, `docs/${Date.now().toString()}_${file.originalname}`);
        }
    })
});
exports.fileUploadS3 = fileUpload.single('file');
