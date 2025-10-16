import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AppContext } from "../../contex/AppContext";

const CreateBlogPost = () => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createBlog } = useContext(AppContext);
  // State for image preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // --- Image Handling Function ---
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Create a temporary URL for local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  // --- Form Submission Handler ---
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.postTitle);
    formData.append("content", data.postContent);

    if (data.postImage && data.postImage[0]) {
      formData.append("image", data.postImage[0]); // append actual File
    }
    try {
      await createBlog(formData); // send to backend (with correct headers)
      alert("Blog created successfully!");
      reset();
      setImagePreviewUrl(null);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Check console for details.");
    }
  };

  // Framer Motion variants for simple animation
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8 border-b pb-4">
          <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
            ✍️ Create New Blog Post
          </motion.span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* --- Title Input --- */}
          <motion.div variants={fieldVariants} className="form-group">
            <label
              htmlFor="postTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Post Title
            </label>
            <input
              id="postTitle"
              type="text"
              placeholder="A Catchy Title for Your Blog"
              className={`mt-1 block w-full border ${
                errors.postTitle ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
              {...register("postTitle", { required: "Title is required" })}
            />
            {errors.postTitle && (
              <p className="mt-1 text-sm text-red-500">
                {errors.postTitle.message}
              </p>
            )}
          </motion.div>

          {/* --- Content Textarea --- */}
          <motion.div variants={fieldVariants} className="form-group">
            <label
              htmlFor="postContent"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="postContent"
              rows="12"
              placeholder="Start writing your amazing blog content here..."
              className={`mt-1 block w-full border ${
                errors.postContent ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
              {...register("postContent", {
                required: "Content cannot be empty",
              })}
            />
            {errors.postContent && (
              <p className="mt-1 text-sm text-red-500">
                {errors.postContent.message}
              </p>
            )}
          </motion.div>

          {/* --- Image Upload --- */}
          <motion.div variants={fieldVariants} className="form-group">
            <label
              htmlFor="postImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Featured Image
            </label>
            <input
              id="postImage"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100 cursor-pointer transition duration-150"
              {...register("postImage", { onChange: handleImageChange })}
            />
          </motion.div>

          {/* --- Image Preview --- */}
          <motion.div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
            variants={fieldVariants}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Image Preview
            </h3>
            <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-md bg-gray-200">
              {imagePreviewUrl ? (
                <motion.img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <p className="text-gray-500">
                  Upload an image to see the preview here.
                </p>
              )}
            </div>
          </motion.div>

          {/* --- Submit Button --- */}
          <motion.button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.98 }}
          >
            Publish Post
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlogPost;
