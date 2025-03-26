import mongoose, { mongo } from 'mongoose'

const announcementSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    published:{
        type:Date,
        default:new Date()
    },
    lastDate:{
        type:Date,
    },
    file:{
        type:String
    },
    showInHome:{
        type:Boolean
    }
})

const ANNOUNCEMENT = mongoose.model('announcement',announcementSchema)

export default ANNOUNCEMENT