import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})

const Video = mongoose.model("Video",videoSchema)

export default Video
