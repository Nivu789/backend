import { NextFunction, Request, Response } from "express";
const { S3Client } = require('@aws-sdk/client-s3')
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


const fileUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'samskrithibucket',
        metadata: function (req: Request, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req: Request, file: Express.Multer.File, cb: any) {
            console.log("ddsdsd hello")
            cb(null, `videos/${Date.now().toString()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 100, // 100 MB
    },
})


export const videoUploadS3 = fileUpload.single('file');