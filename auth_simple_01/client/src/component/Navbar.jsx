import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <NavLink to="/">
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -6 }}
                className="text-2xl font-extrabold text-indigo-600 tracking-tight"
              >
                Top<span className="text-yellow-400">Blog</span>
              </motion.div>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition py-2 px-4 rounded-md font-semibold text-lg ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition py-2 px-4 rounded-md font-semibold text-lg ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/all-blogs"
              className={({ isActive }) =>
                `transition py-2 px-4 rounded-md font-semibold text-lg ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              Blog Page
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition py-2 px-4 rounded-md font-semibold text-lg ${
                  isActive
                    ? "bg-yellow-100 text-yellow-700"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-yellow-400 px-5 py-2 rounded-full font-bold text-indigo-900 hover:bg-yellow-300 transition hidden md:block"
            >
              Get Started
            </NavLink>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            {/* Mobile menu button */}
            <input id="menu-toggle" type="checkbox" className="hidden peer" />
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer flex flex-col justify-center w-8 h-8"
            >
              <span className="block w-8 h-1 bg-indigo-500 mb-1 rounded transition-all"></span>
              <span className="block w-8 h-1 bg-indigo-500 mb-1 rounded transition-all"></span>
              <span className="block w-8 h-1 bg-indigo-500 rounded transition-all"></span>
            </label>
            {/* Mobile Menu */}
            <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-2 py-4 opacity-0 pointer-events-none scale-y-0 peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:scale-y-100 transition-all duration-300 origin-top">
              <NavLink
                to="/"
                className="py-2 px-6 text-lg font-semibold text-indigo-700 w-full text-center hover:bg-indigo-50"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="py-2 px-6 text-lg font-semibold text-indigo-700 w-full text-center hover:bg-indigo-50"
              >
                About
              </NavLink>
              <NavLink
                to="/card"
                className="py-2 px-6 text-lg font-semibold text-indigo-700 w-full text-center hover:bg-indigo-50"
              >
                Card Page
              </NavLink>
              <NavLink
                to="/dashboard"
                className="py-2 px-6 text-lg font-semibold text-yellow-700 w-full text-center hover:bg-yellow-50"
              >
                Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
