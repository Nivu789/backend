import { NextFunction, Request, Response } from "express";
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    
});

export const s3Upload = (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {imgSrc,title,folderName} = req.body.eventData
        console.log("body",req.body)
        if(imgSrc){

            if(imgSrc.includes("samskrithibucket")){
                next()
            }

            const base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, '');
            // Convert the base64 string to a buffer
            const buffer = Buffer.from(base64Data, 'base64');
            const mimeType = imgSrc.match(/^data:(.*);base64,/)?.[1];


            const uploadParams = {
                Bucket: 'samskrithibucket', // Bucket into which you want to upload file
                Key: folderName+title+"."+mimeType.slice(6,mimeType.length), // File name you want to save as in S3
                Body: buffer, // File buffer
                ContentType: mimeType,
                 // Content type
            };
            
            console.log(mimeType)
            console.log("image type",imgSrc.mimeType)
            // Uploading files to the bucket
            s3.upload(uploadParams, (err:any, data:any) => {
                if (err) {
                    console.log("Error", err);
                    return res.status(500).send(err);
                }
                console.log("Upload Success", data.Location);
                // res.status(200).send(`File uploaded successfully. ${data.Location}`);
                console.log("image uploaded")
                req.body.imageLocation = data.Location
                next()
            });
           

        }else{
            console.log("image was not found, moving to next route")
            next()
        }
        
    } catch (error) {
        console.log(error)
    }
}