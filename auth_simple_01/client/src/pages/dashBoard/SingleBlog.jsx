import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Calendar,
  UserCircle,
  Share2,
  Eye,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../contex/AppContext";
import UserBlog from "./UserBlog";

const SingleBlog = () => {
  //   const { blogPost } = useContext(AppContext);
  const { _id } = useParams();

  const { yourBlogs, allUserBlogs } = useContext(AppContext);
  console.log(_id);

  console.log(yourBlogs);
  const data = yourBlogs
    ? yourBlogs.find((id) => id._id == _id)
    : allUserBlogs.blog.find((id) => id._id == _id);
  console.log(data);
  // Fallback for real context setup

  let post = {
    _id: "1",
    title:
      "Mastering the Art of Responsive Design with Tailwind CSS: A Comprehensive Guide",
    content: `
            <p>The digital landscape is constantly evolving, making responsive design not just a feature, but a mandatory foundation for any modern web application. In the era of mobile-first indexing, sites must adapt seamlessly across all devices—from the smallest smartphone to the largest desktop monitor.</p>

            <h2>Why Choose Tailwind CSS?</h2>
            <p>Tailwind CSS fundamentally changes how we approach styling. Instead of writing verbose CSS classes in separate files, Tailwind provides utility-first classes that allow you to rapidly build complex designs directly in your HTML (or JSX) markup. This drastically reduces context switching and speeds up development.</p>
            
            <p class="font-semibold italic text-lg text-indigo-700 mt-6 mb-6">
                "Utility-first CSS isn't a shortcut; it's a paradigm shift towards highly modular and maintainable front-end code."
            </p>

            <h3>Key Responsive Utilities</h3>
            <ul class="list-disc ml-6 space-y-2">
                <li><strong class="text-indigo-600">Breakpoints:</strong> Utilities like <code>sm:</code>, <code>md:</code>, and <code>lg:</code> allow you to apply styles conditionally.</li>
                <li><strong class="text-indigo-600">Flexbox & Grid:</strong> Easily create complex, fluid layouts using utility classes such as <code>flex</code>, <code>grid</code>, and responsive column counts like <code>lg:grid-cols-3</code>.</li>
                <li><strong class="text-indigo-600">Spacing:</strong> Consistent and scalable padding (<code>p-</code>) and margin (<code>m-</code>) utilities simplify layout management.</li>
            </ul>

            <h2>Beyond the Basics: Performance</h2>
            <p>Another major benefit is performance. Because Tailwind is highly customizable and tree-shakes unused styles, the resulting CSS bundle is often significantly smaller than traditional frameworks. This leads to faster load times and a better user experience.</p>
            
            <p>In conclusion, adopting Tailwind CSS for responsive design streamlines workflow, enforces design consistency, and delivers performance gains that are essential for large-scale applications. It's truly a game-changer for front-end development.</p>
        `,
    image:
      "https://placehold.co/1200x600/1E3A8A/ffffff?text=Modern+Responsive+Layout",
    like: 154,
    commentCount: 12,
    views: 4521,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: {
      name: "Alex Johnson",
      profileImage: "https://placehold.co/150x150/4F46E5/ffffff?text=AJ",
      bio: "Lead Front-End Architect specializing in React and Tailwind CSS. Passionate about performance and developer experience.",
    },
  };
  //   const post = blogPost || {};

  if (data) {
    post = data;
  }
  useEffect(() => {
    // Mock function for tracking view count or other initialization
    console.log(`✅ Single Blog Component Loaded for ID: ${post._id || "N/A"}`);
  }, [post._id]);

  // Helper function for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Animation variant for the main container
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Component for Stat/Action Icons
  const StatIcon = ({ icon: Icon, value, colorClass }) => (
    <span
      className={`flex items-center space-x-2 text-gray-500 transition duration-300 ${colorClass}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{value}</span>
    </span>
  );

  // Render the main content HTML safely
  const renderContent = (htmlContent) => {
    // Apply default typography classes to ensure readability
    const styledContent = htmlContent
      .replace(/<p>/g, '<p class="mb-6 leading-relaxed text-lg text-gray-700">')
      .replace(
        /<h2>/g,
        '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-5 border-b pb-2">'
      )
      .replace(
        /<h3>/g,
        '<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">'
      )
      .replace(
        /<ul/g,
        '<ul class="list-disc ml-6 space-y-2 mb-6 text-gray-700 text-lg"'
      );

    return <div dangerouslySetInnerHTML={{ __html: styledContent }} />;
  };

  if (!post._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
        <p className="text-xl text-gray-600">
          Loading blog post or post not found...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen font-inter bg-gray-50 pb-20"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header / Hero Section */}
      <header className="relative w-full h-96 overflow-hidden bg-gray-900 shadow-2xl">
        {/* Image Background */}
        <motion.img
          src={
            post.image ||
            "https://placehold.co/1600x600/374151/ffffff?text=Blog+Cover+Image"
          }
          alt={post.title}
          className="w-full h-full object-cover opacity-60 transition duration-500"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/1600x600/374151/ffffff?text=Blog+Cover+Image")
          }
        />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 bg-gradient-to-t from-gray-900/90 to-transparent">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta Data Row */}
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-300 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Published on {formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span>{post.like || 0} Likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span>{post.commentCount || 0} Comments</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Author Badge */}
          <motion.div
            className="flex items-center space-x-4 mb-10 pb-4 border-b border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img
              src={
                post.author?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={post.author?.name}
              className="w-12 h-12 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                Written by
              </p>
              <span className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition">
                {post.author?.name || "Unknown Author"}
              </span>
            </div>
          </motion.div>

          {/* Blog Body (using renderContent to style mock HTML) */}
          <article className="prose max-w-none text-gray-700">
            {renderContent(post.content)}
          </article>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center flex-wrap gap-4">
            {/* Interactive Stats */}
            <div className="flex space-x-8">
              <button
                className="focus:outline-none"
                aria-label="Like this post"
              >
                <StatIcon
                  icon={Heart}
                  value={post.like || 0}
                  colorClass="hover:text-red-600"
                />
              </button>
              <button className="focus:outline-none" aria-label="View comments">
                <StatIcon
                  icon={MessageCircle}
                  value={post.commentCount || 0}
                  colorClass="hover:text-indigo-600"
                />
              </button>
              <StatIcon
                icon={Share2}
                value="Share"
                colorClass="cursor-pointer hover:text-blue-600"
              />
            </div>

            {/* Views */}
            <div className="text-sm text-gray-400 flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views || 0} views</span>
            </div>
          </div>
        </div>

        {/* Author Bio Section - Separated for prominence */}
        <div className="mt-16 p-8 bg-indigo-50 rounded-3xl shadow-inner border border-indigo-100">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center space-x-3">
            <UserCircle className="w-6 h-6" />
            <span>About {post.author?.name || "The Author"}</span>
          </h3>
          <div className="flex items-start space-x-6">
            <img
              src={
                post.author?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={post.author?.name}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-4 border-indigo-300"
            />
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.author?.bio ||
                "This writer has a deep passion for modern web technologies and building performant, user-centric interfaces."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default SingleBlog;
