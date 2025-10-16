import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../contex/AppContext";
// Placeholder Image Component

export default function Login() {
  const { loginFunction, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // Set default values, important for the role radio button
    defaultValues: {
      role: "User",
    },
  });
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  });

  const onSubmit = (data) => {
    // Simulate an API call delay
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    loginFunction(data);
    // resolve();
    //   }, 1000);
    // });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Framer Motion Wrapper for the entire card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-100"
      >
        {/* 1. Left Column: The Login Form (Form on the left, as requested) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 order-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
            Member Login
          </h2>
          <p className="mb-8 text-gray-500 font-medium">
            Access your TopBlog account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200 focus:border-indigo-400"
                }`}
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200 focus:border-indigo-400"
                }`}
                placeholder="Your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Role
              </label>
              <div className="flex gap-6">
                {/* User Role (Default) */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="User"
                    {...register("role")}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">User</span>
                </label>

                {/* Admin Role */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Admin"
                    {...register("role")}
                    className="accent-red-500 w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">Admin</span>
                </label>
              </div>
            </div>

            {/* Submit Button with Framer Motion */}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all text-lg mt-8 disabled:bg-indigo-400`}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </motion.button>
          </form>
          <div className="mt-6 gap-2 flex flex-col  justify-between items-center ">
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign up here
              </Link>
            </p>
            <p className="">OR</p>
            <div className=" text-center text-gray-600 text-sm">
              Don't remember password ?{" "}
              <Link
                to="/forgotPassword"
                className="text-orange-500 font-bold hover:underline"
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Right Column: Image/Visual (Hidden on small screens) */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-10 border-l border-gray-100">
          <img
            src={login}
            alt="Login Visual"
            loading="lazy"
            className="object-center object- w-auto h-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
