import { NextFunction, Request, Response } from "express";
import { convert } from "../helpers/formatDataAndTime";
import EVENT from "../models/eventModel";
import moment from 'moment-timezone';
import ANNOUNCEMENT from "../models/announcementModel";
import GALLERY from "../models/galleryModel";

export const postEvent = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {title,description,venue,seats,dates,time,showInHome,activity} = req.body.eventData
        const startDateIST = moment(dates[0]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const endDateIST = moment(dates[1]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const finalDate = [startDateIST,endDateIST]
        console.log("final",finalDate)
        console.log("image location from 2nd route",req.body.imageLocation)
        const formatedDates = convert(finalDate,time)
        const startDate = (formatedDates[0])
        const endDate = (formatedDates[1])
        console.log(formatedDates)
        const postEvent = await EVENT.create({
            title,
            desc:description,
            venue,
            seats,
            startDate,
            endDate,
            showInHome,
            activity,
            img:req.body.imageLocation
        })

        if(postEvent){
            res.json({message:"Event hosted"})
        }else{
            res.json({error:"Coudn't host the event"})
        }

    } catch (error) {   
        console.log(error)
    }
}

export const getEvents = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const eventList = await EVENT.find({})
        if(eventList){
            res.json({events:eventList})
        }else{
            res.json([])
        }
    } catch (error) {
        console.log(error)
    }
}

export const getEventInfo = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const eventId = req.params.id
        const event = await EVENT.findById({_id:eventId})
        if(event){
            return res.json({eventInfo:event})
        }

        return res.json({error:"Something went wrong while getting event"})
    } catch (error) {
        console.log(error)
    }
}

export const editEventInfo = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {title,description,venue,seats,dates,time,showInHome} = req.body.eventData
        const startDateIST = moment(dates[0]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const endDateIST = moment(dates[1]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const finalDate = [startDateIST,endDateIST]
        console.log("final",finalDate)
        console.log("image location from 2nd route",req.body.imageLocation)
        const formatedDates = convert(finalDate,time)
        const startDate = (formatedDates[0])
        const endDate = (formatedDates[1])
        console.log(formatedDates)
        const id = req.params.id
        const updateEventInfo = await EVENT.updateOne({_id:id},{$set:{title,desc:description,venue,seats,startDate,
            endDate, showInHome,
            img:req.body.imageLocation}})
        if(updateEventInfo){
            res.json({message:"Updated information successfully"})
        }else{
            res.json({error:"Something went wrong while updating"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeEvent = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        console.log("dsdsd")
        const id = req.params.id
        const deleteEvent = await EVENT.deleteOne({_id:id})
        if(deleteEvent){
            res.json({message:"Removed event successfully"})
        }else{
            res.json({error:"Something went wrong on removing"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const postAnnouncement = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {title,description,last_date,showInHome} = req.body
        const modifiedDate = last_date ? new Date(last_date) : null
        const fileLocation = req.file ? (req.file as any).location : ""
        const pushAnnouncement = await ANNOUNCEMENT.create({
            title,
            description,
            lastDate:modifiedDate ? modifiedDate : null,
            file:fileLocation,
            showInHome
        })
        if(pushAnnouncement){
            res.json({message:"Announcement made",success:true})
        }else{
            res.json({error:"Something went wrong",succes:false})
        }
    } catch (error) {
        console.log(error)
    }
}


export const getAnnouncements = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const announcements = await ANNOUNCEMENT.find({})
        if(announcements){
            res.json({announcements,success:true})
        }else{
            res.json({error:"Something went wrong",succes:false})
        }
    } catch (error) {
        console.log(error)
    }
}

export const editAnnouncement = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {title,description,last_date,id,showInHome} = req.body
        const modifiedDate = last_date ? new Date(last_date) : null
        const fileLocation = req.file ? (req.file as any).location : ""
        if(fileLocation){
            await ANNOUNCEMENT.updateOne({_id:id},{$set:{title:title,description:description,lastDate:modifiedDate,file:fileLocation,showInHome}})
        }else{
            await ANNOUNCEMENT.updateOne({_id:id},{$set:{title:title,description:description,lastDate:modifiedDate,showInHome}})
        }

        res.json({message:"Updated announcement",success:true})
        
    } catch (error) {
        res.json({error:"Something went wrong",success:false})
        console.log(error)
    }
}

export const deleteAnnouncement = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const itemId = req.body.id
        const deleteOne = await ANNOUNCEMENT.deleteOne({_id:itemId})
        if(deleteOne){
            res.json({message:"Removed announcement",success:true})
        }else{
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
    }
}


export const getGalleryFolders = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const folders = await GALLERY.find({},{folderName:1,_id:0}).sort({dateCreated:-1})
        console.log(folders)
        const folderNames = folders.map((item)=>item.folderName)
        res.json({folderNames})
    } catch (error) {
        console.log(error)
    }
}


export const deleteGalleryFolder = async(req:Request,res:Response) =>{
    try {
        const {folderName} = await req.body
        if(folderName){
            const deleteFolder = await GALLERY.findOneAndDelete({folderName})
            if(deleteFolder){
                return res.json({success:true,message:"Folder deleted"})
            }else{
                return res.json({success:false,message:"Folder deletion failed"})
            }
        }
    } catch (error) {
        console.log(error)
    }
}