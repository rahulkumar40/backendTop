import { Blog } from "../model/blog.model.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const postBlog = async(req, res)=>{
        // console.log(req.body)
    try{
        const {title,content,like, disLike} = req.body;
        if(!title || !content){
            return res.status(401).json({
                success:false,
                message:"Empty Field"
            })

        }
        let imageUrl = null;
        if(req.file ){
            const uploadedImage = await uploadOnCloudinary(req.file.path);
         imageUrl = uploadedImage.url;
        }
        
        const userId = req.id;
        console.log("User Who created This ... ", userId)
        const newBlog = await Blog.create({
            title,
            content,
            image:imageUrl,
            author:req.id,
            like,
            disLike
        })
        console.log("Blog : ", newBlog)

        await User.findByIdAndUpdate(userId, {
            $push:{blog:newBlog._id}
        })
        const user = await User.findById(userId).populate('user', 'name image').populate('comment', '');
        // console.log(saveToUser)
        res.status(200).json({
            success:true,
            message:"Blog Posted !",
            newBlog,
            // user
        })
    }catch(err){
        console.log("Error : ", err.message);
        return res.status(500).json({
            success:false, 
            message:err.message
        })
    }
}

export const getAllBlog = async(req, res)=>{
    try{
        const blog = await Blog.find({}).populate('Comment');
        if(!blog){
            return res.status(400).json({
                success:false,
                message:"Not Any Blog Prasent"
            })
        }
        res.status(200).json({
            success:true,
            message:"All Blog !",
            blog,
            userId:req.id
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal Server problem!",
            error:e.message
        })
    }
}
// export default getAllBlog ;

export const getUserBlog = async(req, res)=>{
    try{
        // const {blogId} = req.body;
        const userId = req.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Missing User Id"
            })
        }
const userAllBlog = await Blog.find({ author: userId })
  .populate({
    path: "author",
    select: "name profile",
  })
  .populate({
    path: "comment",
    select: "content user reply",
    populate: [
      { path: "user", select: "name profile" },
      { path: "reply", select: "content user", populate: { path: "user", select: "name profile" } },
    ],
  })
  .lean();

console.log(JSON.stringify(userAllBlog, null, 2));

        console.log("Your All Blog ", userAllBlog);
        if(!userAllBlog){
            return res.status(400).json({
                success:false,
                message:"Blog Not Present | Create Now"
            })
        }
        res.status(200).json({
            success:true,
            message:"Blog Fatech !",
            userAllBlog
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:e.message
        })
    }
}