import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    try {
        const token = req.headers.authorization || ""
        // console.log(token)
        const tokenCheck = jwt.verify(token,process.env.JWT_SECRET || "",(err,decoded)=>{
            if(err){
                return res.json({error:"Unauthorized"})
            }else{
                return res.json({message:"Success"})
            }
        })
    } catch (error) {
        res.json({error:"Login to access this page"})
    }
}