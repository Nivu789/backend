"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommitteeImagesFromS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const fetchCommitteeImagesFromS3 = (req, res, next) => {
    try {
        console.log("Working");
        return new Promise((resolve, reject) => {
            const s3params = {
                Bucket: 'samskrithibucket',
                Delimiter: '/',
                Prefix: 'committees/' + req.body.prefix
            };
            s3.listObjectsV2(s3params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
                console.log("Data", data);
                if (req.body.prefix !== "") {
                    if (data && data.Contents) {
                        const folders = data.Contents.map(content => {
                            return content.Key; // Extract the folder name
                        });
                        console.log("Folders", folders);
                        return res.json({ folders });
                    }
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchCommitteeImagesFromS3 = fetchCommitteeImagesFromS3;
