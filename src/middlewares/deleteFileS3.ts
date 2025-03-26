import { Response,Request,NextFunction } from "express"
import AWS, { RDS } from 'aws-sdk'
import ANNOUNCEMENT from "../models/announcementModel";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    
});



export const deleteFileS3 = (req:Request,res:Response,next:NextFunction) =>{
    try {
        if(req.body.filePath){
            const filePath = req.body.filePath.slice(52,req.body.filePath.length).replace(/%20/g, ' ')
        console.log(filePath)
        s3.deleteObject({Bucket:"samskrithibucket",Key:filePath}, async function(err, data) {
            if (err){ 
                console.log(err, err.stack);
            }
              // error
            else{
                const deleteFile = await ANNOUNCEMENT.updateOne({_id:req.body.id},{$set:{file:""}})
                if(deleteFile){
                    return res.json({success:true})
                }
            }                 // deleted
          }); 

        }else if(req.body.committeeFile){
            console.log(req.body.committeeFile)
            s3.deleteObject({Bucket:"samskrithibucket",Key:req.body.committeeFile}, async function(err, data) {
            if (err){ 
                console.log(err, err.stack);
            }else{
                return res.json({success:true})
            }
        })
        }else if(req.body.data.imgPath){
            console.log(req.body.data.imgPath)
            const filePath = req.body.data.imgPath.slice(42,req.body.data.imgPath.length).replace(/%20/g, ' ')
        console.log("PATHHHHH",filePath)
        s3.deleteObject({Bucket:"samskrithibucket",Key:filePath}, async function(err, data) {
            if (err){ 
                console.log(err, err.stack);
                return res.json({success:false,message:"Deleting image failed"})
            }
              // error
            else{
                return res.json({success:true,message:"Successfully deleted image"})
            }                 // deleted
          }); 

        }
        
        else{
            next()
        }
        
    } catch (error) {
        console.log(error)
    }
}