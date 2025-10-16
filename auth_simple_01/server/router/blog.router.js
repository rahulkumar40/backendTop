import express from 'express'
import  {postBlog, getAllBlog, getUserBlog}  from '../controller/blog.controller.js';
import { auth } from '../middlewares/auth.middlewares.js';
import { uplaod } from '../middlewares/multer.middlerware.js';
import { createComment, createReplies, deleteComment } from '../controller/comment.controller.js';
const blogRouter = express.Router();


blogRouter.post('/create-blog',auth,uplaod.single('image') ,postBlog);
blogRouter.get('/getAllBlogs', getAllBlog)
blogRouter.post('/postcomment', auth, createComment );
blogRouter.post('/commentReply', createReplies)
blogRouter.get('/usersBLog',auth, getUserBlog)
blogRouter.delete('/deleteComment', auth, deleteComment)
export default blogRouter;

