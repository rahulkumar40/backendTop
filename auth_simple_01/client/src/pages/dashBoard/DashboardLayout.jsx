import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../contex/AppContext";
import { motion } from "framer-motion";

// Lucide Icons
import { User, Lock, FileText, PlusCircle, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const { userData, logout } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Please register yourself to access the dashboard.
        </h2>
        <Link
          to="/signUp"
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Register / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{userData?.name}</h2>
            <p className="text-sm text-gray-500">{userData?.email}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <User size={18} /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/changePassword"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <Lock size={18} /> Change Password
          </NavLink>

          <NavLink
            to="/dashboard/My-Blogs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <FileText size={18} /> My Blogs
          </NavLink>

          <NavLink
            to="/dashboard/create-blog"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <PlusCircle size={18} /> Create Blog
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-auto py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-6 overflow-y-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
