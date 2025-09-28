import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    gender:{
        type:String,
        enum:["MALE", "FEMALE", "OTHER"],
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        // required:false,
        // unique:true,
    },
    blog:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    }],
    role:{
        type:String,
        required:true,
        enum:["Admin", "User"],
        default:"User"
    }
})

export const User = mongoose.model("User", userSchema);