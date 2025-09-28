import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    reply:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
}, {timestamps:true})

export const Reply = mongoose.model("Reply", replySchema);  // second thing part 



const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    // replies:[replySchema],  // first thinking 
    reply:[ // second thinking 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reply"
        }
    ]
})
export const Comment = mongoose.model("Comment", commentSchema);
