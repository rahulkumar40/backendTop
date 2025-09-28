import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likeBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    disLikeBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    like:{
        type:Number,
        default:0
    },
    disLike:{
        type:Number,
        default:0
    }, 
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
}, {timestamps:true})

export const Blog = mongoose.model("Blog", blogSchema);