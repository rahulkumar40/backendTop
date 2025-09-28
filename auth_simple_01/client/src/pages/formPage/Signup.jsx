import React from "react";
import { useForm } from "react-hook-form";
import s from "../../assets/signup.png";
import { Link, NavLink } from "react-router-dom";
// Example SVG illustration
// Renamed to SignupVisual to reflect its new role as the visual representation

// Add custom animation for Tailwind if you're using a full config,
// otherwise the 'animate-pulse' built-in can be used.
// If you can't add custom config, you can remove 'animate-pulse-slow' and use standard 'animate-pulse' or nothing.

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    // In a real application, you would send userData to your backend API here
    alert("Signup successful!\n" + JSON.stringify(userData, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* 1. Left Column: The Signup Form (Visible on all screens) */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-14 order-2 lg:order-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
            Join TopBlog 🚀
          </h2>
          <p className="mb-6 text-gray-500 font-medium">
            Create an account and be part of an inspiring community!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200"
                }`}
                placeholder="Your full name"
                autoComplete="name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* Email */}
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200"
                }`}
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200"
                }`}
                placeholder="Your password"
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200"
                }`}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            {/* Gender */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex flex-wrap gap-4">
                {" "}
                {/* Using flex-wrap for small screen responsiveness */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", { required: "Gender is required" })}
                    className="accent-indigo-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", { required: "Gender is required" })}
                    className="accent-pink-500"
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="other"
                    {...register("gender", { required: "Gender is required" })}
                    className="accent-yellow-400"
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
            {/* Role (hidden) */}
            <input type="hidden" value="User" {...register("role")} />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-400 hover:from-indigo-600 hover:via-purple-600 hover:to-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-lg mt-6"
            >
              Create Your Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* 2. Right Column: The Visual Representation (Hidden on small screens) */}
        <div className="hidden lg:block  lg:w-1/2  p-10 w-full order-1 lg:order-2">
          <img
            src={s}
            alt="signup-image"
            loading="lazy"
            className="object-center w-full h-full  rounded-4xl hover:shadow-pink-200 shadow-2xl transition-all ease-in "
          />
        </div>
      </div>
    </div>
  );
}

// NOTE: For the 'animate-pulse-slow' to work, you might need to add it to your
// tailwind.config.js file if you aren't using a utility like styled-components
// or if your Tailwind setup doesn't include custom animation definitions.
