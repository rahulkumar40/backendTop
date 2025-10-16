import { AppContext } from "../../contex/AppContext";
import React, { useContext, useEffect } from "react";
// Assuming AppContext and its types are defined correctly elsewhere in your project
// import { AppContext } from "../../contex/AppContext";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Calendar,
  Eye,
  ImageIcon,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserBlog = () => {
  // In a real app, replace the mock context with the actual import:
  const navigate = useNavigate();
  const { getYourBlogs, yourBlogs, userData } = useContext(AppContext);

  useEffect(() => {
    try {
      // Check if getYourBlogs is available before calling it
      if (getYourBlogs) {
        getYourBlogs();
      }
      console.log("✅ All Blogs Fetched (or mocked)");
    } catch (e) {
      console.log("❌ Error fetching your blogs:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren", // Ensures container appears before children start animating
        delay: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] },
    },
  };

  // Helper function for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const dummyBlogs = yourBlogs || []; // Use empty array if yourBlogs is null

  return (
    <div className="min-h-screen font-inter bg-gray-50 p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Enhanced visual impact */}
        <motion.div
          className="text-center mb-16 pt-8 pb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Creator Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A curated view of all the valuable content you've published. Monitor
            performance and manage your portfolio.
          </p>
        </motion.div>

        {/* Blog List - Responsive Grid */}
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {dummyBlogs.length > 0 ? (
            dummyBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 45px rgba(0, 0, 0, 0.15)", // Stronger lift and shadow
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 flex flex-col"
              >
                {/* Image/Media Section */}
                <div className="relative w-full h-52 sm:h-48 overflow-hidden bg-gray-100">
                  {blog.image ? (
                    <motion.img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition duration-300"
                      whileHover={{ scale: 1.1 }} // subtle zoom on image
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/600x400/D1D5DB/4B5563?text=Image+Load+Failed")
                      }
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-100 p-4">
                      <ImageIcon className="w-12 h-12 mb-2 text-indigo-400" />
                      <p className="text-sm font-medium">
                        No cover image available
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-4 line-clamp-3 flex-grow">
                    {blog.content}
                  </p>

                  {/* Author & Date Metadata */}
                  <div className="flex items-center justify-between text-sm mb-5 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          blog.author?.profileImage ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="author"
                        className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
                      />
                      <span className="text-gray-800 font-semibold">
                        {blog.author?.name || "Anonymous User"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Footer (Stats & Action) - Professional Look */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-gray-500 font-medium text-sm">
                      {/* Likes */}
                      <div className="flex items-center space-x-1 transition duration-200 hover:text-red-500">
                        <Heart className="w-4 h-4 fill-current transition" />
                        <span>{blog.like || 0}</span>
                      </div>
                      {/* Comments */}
                      <div className="flex items-center space-x-1 transition duration-200 hover:text-indigo-600">
                        <MessageCircle className="w-4 h-4 transition" />
                        <span>{blog.comment?.length || 0}</span>
                      </div>
                      {/* Views (Added a placeholder for completeness) */}
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">
                          {Math.floor(Math.random() * 500) + 100}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#4F46E5" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm font-bold px-4 py-2 bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 transition-all duration-300 transform"
                      onClick={() => navigate(`/single-blog/${blog._id}`)}
                    >
                      View Post
                    </motion.button>
                    {/* <Link to={`/single-blog/:${post._id}`}> */}
                    {/* </Link> */}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty State - Centered and impactful */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-full flex flex-col items-center justify-center text-gray-500 mt-20 p-10 bg-white rounded-3xl shadow-lg border border-gray-200"
            >
              <UserCircle className="w-20 h-20 mb-6 text-indigo-400 opacity-60" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                You haven't published anything yet!
              </h2>
              <p className="text-lg text-gray-600 mb-6 text-center">
                Start your creative journey. Your published articles will appear
                here.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(79, 70, 229, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-xl hover:bg-indigo-700 transition duration-300"
                onClick={() => console.log("Navigate to Create New Blog Page")}
              >
                + Create New Blog
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserBlog;
