import mongoose from "mongoose";
require('dotenv').config();

export default async function connectDatabase(){
    try {
        console.log(process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL || "")
        return "Database connected"
    } catch (error) {
        console.log(error)
    }
}