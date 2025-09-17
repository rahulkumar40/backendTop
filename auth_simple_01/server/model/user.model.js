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
        lowercase:true,
    },
    gender:{
        type:String,
        enum:["MALE", "FEMELE", "OTHER"],
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
    }
})

export const User = mongoose.model("User", userSchema);