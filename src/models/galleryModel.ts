import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema({
    folderName:{
        type:String,
        require:true
    },
    dateCreated:{
        type:Date
    }
})

const GALLERY = mongoose.model('gallery',gallerySchema)

export default GALLERY