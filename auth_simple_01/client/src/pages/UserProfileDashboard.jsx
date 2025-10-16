import React, { useContext, useEffect } from "react";
import { AppContext } from "../contex/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const generateAvatarInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ").filter((part) => part.length > 0);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return parts
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function UserProfileDashboard() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(userData);
  useEffect(() => {
    console.log(userData);
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }
  const { name, email, role, _id, password } = userData; // adjust keys based on your backend

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Avatar */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold">
          {generateAvatarInitials(name)}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </motion.div>

      {/* User Info */}
      <motion.div
        className="mt-6 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{email}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Role:</span>
          <span className="text-gray-800">{role}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">User ID:</span>
          <span className="text-gray-800">{_id}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Password:</span>
          <span className="text-gray-800">********</span>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={() => navigate("/logout")}
        className="mt-6 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
}
