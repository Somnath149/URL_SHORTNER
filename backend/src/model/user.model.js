import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
},
    { timestamps: true }
);

const User = mongoose.model("User", UserModel)
export default User;