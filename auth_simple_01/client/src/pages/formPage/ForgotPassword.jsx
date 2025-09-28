import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AppContext } from "../../contex/AppContext";
import { useNavigate } from "react-router-dom";

const ForgotPasswordImage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-yellow-500/10">
    <div className="w-64 h-64 bg-yellow-200 rounded-full flex items-center justify-center shadow-xl">
      <span className="text-4xl text-yellow-700 font-bold">🔒</span>
    </div>
    <h3 className="text-2xl font-bold text-yellow-700 mt-6">
      Trouble logging in?
    </h3>
    <p className="mt-2 text-gray-600">
      Enter your email and we'll send you a link to get back into your account.
    </p>
  </div>
);

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const updated = { ...authData, email: data.email };
    setAuthData(updated);
    // ✅ merge with context

    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Password reset link sent to:\n" + data.email);
        console.log("orginal data:", data);
        console.log("auth data : ", authData);

        reset();
        resolve();
        navigate("/varifyOTP"); // ✅ only after success
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-100"
      >
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 order-2 lg:order-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-yellow-600 mb-2">
            Forgot Password?
          </h2>
          <p className="mb-8 text-gray-500 font-medium">
            Enter your email address to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    : "focus:ring-yellow-200 focus:border-yellow-400"
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

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-yellow-600 transition-all text-lg mt-8 disabled:bg-yellow-300"
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            <a
              href="/login"
              className="text-yellow-600 font-bold hover:underline"
            >
              Return to Login
            </a>
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-10 border-l border-gray-100 order-1 lg:order-2">
          <ForgotPasswordImage />
        </div>
      </motion.div>
    </div>
  );
}
