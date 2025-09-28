import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    bio:{
        type:String,
    },
    about:{
        type:String,
        default:"What can say about myself, see my work."
    },
    address:{
        type:String,
        default:"abcd",
    },
    image:{
        type:String,
        default:""
    },
    socialMedia:[
        {
            mediaName:{
                type:String,
            },
            link:{
                type:String,
            }
        }
    ],
}, {timestamps:true});

export const Profile = mongoose.model("Profile", profileSchema);