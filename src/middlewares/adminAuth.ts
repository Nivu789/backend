import { NextFunction, Request, Response } from "express"
import jwt, { decode } from 'jsonwebtoken'

export const adminAuth = (req:Request,res:Response,next:NextFunction) =>{
    try {
        if(req.body.userType=="admin"){
            const adminToken = req.headers.authorization || ""
            const veifyToken = jwt.verify(adminToken,process.env.JWT_SECRET || "" ,(err,decoded)=>{
            if(err){
                res.json({error:"You are not authorized"})
            }

            if(decoded){
                next()
            }
        })
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error)
    }
}