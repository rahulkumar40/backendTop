import { Blog } from "../model/blog.model.js";
import { Comment, Reply } from "../model/comment.model.js";

export const createComment = async(req, res)=>{
    try{
        const {comment, blogId} = req.body;
        if(!comment) {
             return res.status(400).json({
                success:false,
                message:"missing field !"
            })
        }
        const userId = req.id;
        console.log("ye chal raha hai ")
        // if here new Comment.create({k:k})
        // then it give error custructor not define like so make sure use of await or new 
        // console.log(first)
        const  newComment = await Comment.create({
            comment, 
            user:userId,
            blog:blogId
        })
        const newUpdatedBlog = await Blog.findByIdAndUpdate({_id:blogId}, {$push:{comment:newComment._id}}, {new:true});

        console.log("new Comment", newComment);
        console.log("New Updated Blog")
        res.status(200).json({
            success:true,
            message:"commented",
            comment:newComment,
            newUpdatedBlog
        })
    }catch(e){
        res.status(500).json({
            success:false, 
            message:"Internal Server Error",
            error:e.message
        })
    }
}
export const deleteComment = async(req, res)=>{
    try{
        const {commentId} = req.body;
        const deletedComment = await Comment.findByIdAndDelete({_id:commentId});
        console.log("Deleted commnet ")
        res.status(200).json({
            success:true,
            message:"Comment Deleted !", 
            deletedComment
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:e.message
        })
    }
}
export const updateComment = async(req, res)=>{
    try{
        const {commentId, comment} = req.body;
        if(commentId) Comment.comment = comment
        await Comment.bulkSave();
        res.status(200).jso({
            success:true,
            message:"Comment Updated !"
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal Server Error", 
            error:e.message
        })
    }
}

export const createReplies = async(req, res)=>{
    try{
        const {reply, commentId} = req.body;
        if(!reply){
            return res.status(400).json({
                success:false,
                message:"missing field !"
            })
        }
        const userId = req.id;
        const newReply = await Reply.create({
            reply, 
            user:userId,
            comment:commentId
        })

        console.log("new reply ", newReply)
        console.log("id is : ", commentId)
        await Comment.findOneAndUpdate({_id:commentId}, {$push:{reply:newReply._id}}, {new:true})

        res.status(200).json({
            success:false,
            message:"Repled ! ",
            reply:newReply
        })
        
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:e.message
        })
    }
}
export const deleteReply = async(req, res)=>{
    try{
        const {replyId} = req.body;
        const deletedReply = await Comment.findByIdAndDelete({_id:replyId});
        console.log("Deleted reply  ", deletedReply)
        res.status(200).json({
            success:true,
            message:"Reply  Deleted !", 
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:e.message
        })
    }
}
export const updateReply = async(req, res)=>{
    try{
        const {replyId, reply} = req.body;
        if(replyId) Reply.reply = reply
        await Reply.save();
        res.status(200).jso({
            success:true,
            message:"Reply Updated !"
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal Server Error", 
            error:e.message
        })
    }
}
