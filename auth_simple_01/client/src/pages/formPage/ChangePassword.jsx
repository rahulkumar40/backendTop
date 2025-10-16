import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
// import { AppContext } from "../dashBoard/Profile";
import { AppContext } from "../../contex/AppContext";

// Placeholder Image Component
const ChangePasswordImage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-blue-500/10">
    <div className="w-64 h-64 bg-blue-200 rounded-full flex items-center justify-center shadow-xl">
      <span className="text-4xl text-blue-700 font-bold">⚙️</span>
    </div>
    <h3 className="text-2xl font-bold text-blue-700 mt-6">
      Keep Your Account Secure
    </h3>
    <p className="mt-2 text-gray-600">
      It's a good practice to change your password regularly.
    </p>
  </div>
);

export default function ChangePassword() {
  const { changePassword } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Use watch to get the value of the newPassword field for comparison
  const newPassword = watch("newPassword", "");

  const onSubmit = (data) => {
    // Data ready for the API call (excluding confirmPassword)
    const submissionData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    // NOTE: In a real app, you would make an authenticated API call here.
    // The backend verifies 'oldPassword' before hashing and saving 'newPassword'.
    return new Promise((resolve) => {
      setTimeout(() => {
        // alert(
        //   "Password change successful!\n" +
        //     JSON.stringify(submissionData, null, 2)
        // );
        console.log("Submitting:", submissionData);
        changePassword(submissionData);
        reset(); // Clear the form after success
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Framer Motion Wrapper for the card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-100"
      >
        {/* Left Column: The Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 order-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">
            Change Password
          </h2>
          <p className="mb-8 text-gray-500 font-medium">
            Enter your current password and your new secure password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 1. Old Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Old Password
              </label>
              <input
                type="password"
                {...register("oldPassword", {
                  required: "Current password is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.oldPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200 focus:border-blue-400"
                }`}
                placeholder="Your current password"
                autoComplete="current-password"
              />
              {errors.oldPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>

            {/* 2. New Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200 focus:border-blue-400"
                }`}
                placeholder="Enter a new password (min 8 chars)"
                autoComplete="new-password"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            {/* 3. Confirm New Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  // Validation rule to check if it matches the 'newPassword' field
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200 focus:border-blue-400"
                }`}
                placeholder="Re-enter new password"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Button with Framer Motion */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all text-lg mt-8 disabled:bg-blue-400`}
            >
              {isSubmitting ? "Updating..." : "Change Password"}
            </motion.button>
          </form>
        </div>

        {/* Right Column: Image/Visual */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-10 border-l border-gray-100 order-2">
          <ChangePasswordImage />
        </div>
      </motion.div>
    </div>
  );
}
