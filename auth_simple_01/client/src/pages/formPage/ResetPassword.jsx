import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../contex/AppContext";
import { motion } from "framer-motion";
// Placeholder Image Component
const ResetPasswordImage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-indigo-500/10">
    <div className="w-64 h-64 bg-indigo-200 rounded-full flex items-center justify-center shadow-xl">
      <span className="text-4xl text-indigo-700 font-bold">✨</span>
    </div>
    <h3 className="text-2xl font-bold text-indigo-700 mt-6">
      Set a New Password
    </h3>
    <p className="mt-2 text-gray-600">
      A new password will give you fresh start! Choose something strong.
    </p>
  </div>
);

export default function ResetPassword() {
  // Consume email and otp from the Context API
  // const { authData } = useAuth();
  const { authData, resetPassword } = useContext(AppContext);

  const { email, otp } = authData;
  //   console.log(newEmail);
  console.log("Email : ", email, "and otp ", authData.otp);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword", "");

  const onSubmit = (data) => {
    // Prepare the data to be sent to the backend
    const submissionData = {
      email: email, // Get email from Context
      otp: otp, // Get OTP from Context
      newPassword: data.newPassword,
    };

    // Simulate an API call to your backend's password reset endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(
          "Password reset successful!\n" +
            JSON.stringify(submissionData, null, 2)
        );
        resetPassword(submissionData)
        console.log("Submitting:", submissionData);
        // In a real app, redirect to the login page
        // navigate('/login');
        resolve();
      }, 1500);
    });
  };

  // Optional: Handle the case where email or OTP is missing
  //   console.log(email.email);
  if (!otp || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-red-500">
          Authentication data is missing. Please go back and request a new
          password reset.
        </p>
      </div>
    );
  }

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
          <h2 className="text-4xl font-extrabold text-indigo-600 mb-2">
            Reset Password
          </h2>
          <p className="mb-8 text-gray-500 font-medium">
            Almost there! Create a new strong password for your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200 focus:border-indigo-400"
                }`}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-indigo-200 focus:border-indigo-400"
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
              className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all text-lg mt-8 disabled:bg-indigo-400`}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>
        </div>

        {/* Right Column: Image/Visual */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-10 border-l border-gray-100 order-2">
          <ResetPasswordImage />
        </div>
      </motion.div>
    </div>
  );
}
