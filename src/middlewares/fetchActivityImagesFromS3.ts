import { NextFunction,Request,Response } from "express";
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    
});


export const fetchActivityImagesFromS3 = (req:Request,res:Response,next:NextFunction) =>{
    try {
        console.log("Working")
        console.log(req.body.prefix)
        return new Promise ((resolve, reject) => {
            const s3params = {
              Bucket: 'samskrithibucket',
              MaxKeys: 20,
              Delimiter: '/',
              Prefix: 'activity/'+req.body.prefix
            };
            s3.listObjectsV2 (s3params, (err, data) => {
              if (err) {
                reject (err);
              }
              resolve (data);
              console.log("Data",data)
              if(req.body.prefix!==""){
                if(data && data.Contents ){
                    const folders = data.Contents.map(content => {
                        return content.Key; // Extract the folder name
                    });
                    console.log("Folders",folders)
                    return res.json({folders})
                  }
              
                }
              
            });
          }); 
    } catch (error) {
        console.log(error)
    }
}