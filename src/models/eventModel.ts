import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
    },
    venue:{
        type:String
    },
    seats:{
        type:String
    },
    startDate:{
        type:Array
    },
    endDate:{
        type:Array
    },
    showInHome:{
        type:Boolean
    },
    activity:{
        type:String
    },
    img:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const EVENT = mongoose.model('events',eventSchema)

export default EVENT