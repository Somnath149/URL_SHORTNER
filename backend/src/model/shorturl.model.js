import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    full_url:{
        type:String,
        required:true
    },
    short_url:{
        type:String,
        required:true,
        unique:true
    },
    count:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{ timestamps:true})

const UrlModel = mongoose.model("UrlModel",UrlSchema);
export default UrlModel;
