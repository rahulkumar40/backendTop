import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AppContext } from "../../contex/AppContext";
import { useNavigate } from "react-router-dom";

const VerifyOTPImage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-cyan-500/10">
    <div className="w-64 h-64 bg-cyan-200 rounded-full flex items-center justify-center shadow-xl">
      <span className="text-4xl text-cyan-700 font-bold">✅</span>
    </div>
    <h3 className="text-2xl font-bold text-cyan-700 mt-6">
      Verify Your Account
    </h3>
    <p className="mt-2 text-gray-600">
      A 6-digit OTP has been sent to your email. Please check your inbox.
    </p>
  </div>
);

export default function VerificationOTP({ userEmail }) {
  const { setAuthData, authData, verifyPasswordOTP } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Second page data:", data);
    const updateData = { ...authData, otp: data.otp };
    setAuthData(updateData); // ✅ merge properly
    console.log(updateData);
    return new Promise((resolve) => {
      setTimeout(() => {
        // alert("Verifying:\n" + JSON.stringify(authData, null, 2));
        verifyPasswordOTP(authData);
        console.log("Submitting:", { authData });
        resolve();
        navigate("/resetPassword"); // ✅ redirect after success
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
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 order-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-cyan-600 mb-2">
            Verify OTP
          </h2>
          <p className="mb-8 text-gray-500 font-medium">
            Enter the 6-digit code sent to{" "}
            <strong>{userEmail || "your email"}</strong>.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                6-Digit OTP
              </label>
              <input
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                  maxLength: { value: 6, message: "OTP must be 6 digits" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                })}
                className={`w-full px-4 py-2 text-center text-xl tracking-widest border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                  errors.otp
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-cyan-200 focus:border-cyan-400"
                }`}
                placeholder="● ● ● ● ● ●"
                autoComplete="off"
              />
              {errors.otp && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.otp.message}
                </span>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyan-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-cyan-600 transition-all text-lg mt-8 disabled:bg-cyan-300"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={() => alert("Resending OTP...")}
              className="text-cyan-600 font-bold hover:underline"
            >
              Resend
            </button>
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-10 border-l border-gray-100 order-2">
          <VerifyOTPImage />
        </div>
      </motion.div>
    </div>
  );
}
