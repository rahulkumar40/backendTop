import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    address:{
        type:String,
        default:"abcd",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    image:{
        type:String,
    },
}, {timestamps:true});

export const Profile = mongoose.model("Profile", profileSchema);