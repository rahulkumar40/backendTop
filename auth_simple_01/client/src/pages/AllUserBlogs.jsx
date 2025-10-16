import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../contex/AppContext";
// import { motion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User as UserIcon,
  Send,
  Edit,
  Save,
  X,
  Loader2,
  ArrowRight,
} from "lucide-react";
const CommentForm = ({ blogId }) => {
  const { postComment } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await postComment(blogId, data.content);
      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 border-t pt-4"
    >
      <h4 className="font-semibold text-gray-800 mb-2">Leave a Comment</h4>
      <textarea
        {...register("content", {
          required: "Comment content is required",
          minLength: {
            value: 5,
            message: "Comment must be at least 5 characters",
          },
        })}
        placeholder="Write your comment..."
        disabled={isSubmitting}
        className={`w-full p-3 border rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${
          errors.content ? "border-red-500" : "border-gray-300"
        }`}
        rows="3"
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <X className="w-4 h-4 mr-1" />
          {errors.content.message}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition duration-300"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {isSubmitting ? "Posting..." : "Post Comment"}
      </motion.button>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-2">
          Comment posted successfully!
        </p>
      )}
    </motion.form>
  );
};
const ReplyForm = ({ blogId, commentId, closeForm }) => {
  const { postReply } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await postReply(blogId, commentId, data.content);
      setStatus("success");
      reset();
      setTimeout(closeForm, 1500); // Close after successful post
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200"
    >
      <h5 className="font-medium text-sm text-indigo-700 mb-2">
        Replying to Comment
      </h5>
      <textarea
        {...register("content", {
          required: "Reply content is required",
          minLength: {
            value: 3,
            message: "Reply must be at least 3 characters",
          },
        })}
        placeholder="Write your reply..."
        disabled={isSubmitting}
        className={`w-full p-2 border rounded-md text-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${
          errors.content ? "border-red-500" : "border-gray-300"
        }`}
        rows="2"
      />
      {errors.content && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          <X className="w-3 h-3 mr-1" />
          {errors.content.message}
        </p>
      )}

      <div className="flex justify-end space-x-2 mt-2">
        <button
          type="button"
          onClick={closeForm}
          className="px-3 py-1 text-xs font-medium rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-3 py-1 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition"
        >
          {isSubmitting ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : (
            <ArrowRight className="w-3 h-3 mr-1" />
          )}
          {isSubmitting ? "Replying..." : "Post Reply"}
        </motion.button>
      </div>
      {status === "success" && (
        <p className="text-green-600 text-xs mt-2 text-right">Reply sent!</p>
      )}
    </motion.form>
  );
};
const CommentCard = ({ blogId, comment, currentUser }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const isAuthor = currentUser === comment.user._id;

  return (
    <div className="space-y-3">
      <div
        className={`rounded-lg p-3 border ${
          isAuthor
            ? "bg-indigo-50 border-indigo-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <p className="text-gray-700 mb-1">{comment.content}</p>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="font-semibold text-gray-600">
            {comment.user?.name}
            {isAuthor && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-200 text-indigo-700">
                Author
              </span>
            )}
          </span>
          <button
            onClick={() => setShowReplyForm((prev) => !prev)}
            className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition"
          >
            {showReplyForm ? "Close Reply" : "Reply"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-6"
          >
            <ReplyForm
              blogId={blogId}
              commentId={comment._id}
              closeForm={() => setShowReplyForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      {comment.reply && comment.reply.length > 0 && (
        <div className="ml-6 space-y-3 border-l-2 pl-4">
          {comment.reply.map((rep) => (
            <div
              key={rep._id}
              className="bg-white shadow-sm rounded p-3 border border-gray-200"
            >
              <p className="text-gray-700 text-sm mb-1">{rep.content}</p>
              <span className="text-xs text-gray-500 font-medium">
                By {rep.user?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const BlogCard = ({ blog, index, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isAuthor = currentUser === blog.author?._id;

  const GradientPlaceholder = () => (
    <div className="w-full h-60 rounded-xl overflow-hidden mb-4 shadow-lg">
      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <MessageSquare
          className="w-16 h-16 text-indigo-200 opacity-50"
          strokeWidth={1}
        />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white shadow-xl rounded-xl p-8 border border-gray-100 transition duration-300 hover:shadow-2xl"
    >
      {isEditing ? (
        <EditBlogForm blog={blog} setIsEditing={setIsEditing} />
      ) : (
        <>
          {/* Blog Media */}
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-xl w-full h-60 object-cover mb-6 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          ) : (
            <GradientPlaceholder />
          )}

          {/* Blog Header & Author */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {blog.title}
              </h2>
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    {blog.author?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {blog.author?.role} • {blog.author?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button (Only for Author) */}
            {isAuthor && (
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-yellow-400 text-yellow-900 hover:bg-yellow-500 transition shadow-md"
              >
                <Edit className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Content */}
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {blog.content}
          </p>

          {/* Footer Stats */}
          <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-4 border-gray-100">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              Posted: {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-6">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 cursor-pointer text-green-600 font-medium"
              >
                <ThumbsUp className="w-4 h-4" />
                {blog.like}
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 cursor-pointer text-red-600 font-medium"
              >
                <ThumbsDown className="w-4 h-4" />
                {blog.disLike}
              </motion.span>
              <span className="flex items-center gap-1 text-indigo-600 font-medium">
                <MessageSquare className="w-4 h-4" />
                {blog.comment?.length}
              </span>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-8">
            <h4 className="font-bold text-xl text-gray-900 border-b pb-2 mb-4">
              Comments ({blog.comment.length})
            </h4>
            <div className="space-y-4">
              {blog.comment.map((cmt) => (
                <CommentCard
                  key={cmt._id}
                  blogId={blog._id}
                  comment={cmt}
                  currentUser={currentUser}
                />
              ))}
            </div>
            <CommentForm blogId={blog._id} />
          </div>
        </>
      )}
    </motion.div>
  );
};
function AllUserBlogs() {
  const { getAllBlog, allUserBlogs } = useContext(AppContext);
  // Mocking current user ID (for edit/author checks)
  const currentUserId = allUserBlogs?._id;

  useEffect(() => {
    // Run once on mount to simulate initial data load
    getAllBlog();
  }, [getAllBlog]);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-12 border-b pb-4"
        >
          <span className="text-indigo-600">All</span> User Blogs
        </motion.h1>

        {/* If blogs are available */}
        {allUserBlogs && allUserBlogs.blog?.length > 0 ? (
          <div className="grid gap-10">
            {allUserBlogs.blog.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                index={index}
                currentUser={currentUserId}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-10 bg-white rounded-xl shadow-lg mt-10"
          >
            <p className="text-xl text-gray-500 font-medium">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
              No blogs available yet. Be the first to post!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default AllUserBlogs;
