import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    time:{
        type:String,
        required:true
    }
},{_id:false});

const roomSchema = new mongoose.Schema({
    roomName:{
        type: String,
        required:true,
        unique:true
    },
    messages:{
        type:[messageSchema],
        default:[]
    }
},{timestamps:true});


export default mongoose.model("Room",roomSchema);