"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3Upload = (req, res, next) => {
    var _a;
    try {
        const { imgSrc, title, folderName } = req.body.eventData;
        console.log("body", req.body);
        if (imgSrc) {
            if (imgSrc.includes("samskrithibucket")) {
                next();
            }
            const base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, '');
            // Convert the base64 string to a buffer
            const buffer = Buffer.from(base64Data, 'base64');
            const mimeType = (_a = imgSrc.match(/^data:(.*);base64,/)) === null || _a === void 0 ? void 0 : _a[1];
            const uploadParams = {
                Bucket: 'samskrithibucket', // Bucket into which you want to upload file
                Key: folderName + title + "." + mimeType.slice(6, mimeType.length), // File name you want to save as in S3
                Body: buffer, // File buffer
                ContentType: mimeType,
                // Content type
            };
            console.log(mimeType);
            console.log("image type", imgSrc.mimeType);
            // Uploading files to the bucket
            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.log("Error", err);
                    return res.status(500).send(err);
                }
                console.log("Upload Success", data.Location);
                // res.status(200).send(`File uploaded successfully. ${data.Location}`);
                console.log("image uploaded");
                req.body.imageLocation = data.Location;
                next();
            });
        }
        else {
            console.log("image was not found, moving to next route");
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.s3Upload = s3Upload;
