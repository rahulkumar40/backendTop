import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import Navbar from "./component/Navbar";
import About from "./pages/About";
import Signup from "./pages/formPage/Signup";
import CardPage from "./pages/CardPage";
import Login from "./pages/formPage/Login";
import ForgotPassword from "./pages/formPage/ForgotPassword";
import ChangePassword from "./pages/formPage/ChangePassword";
import UserProfileDashboard from "./pages/UserProfileDashboard";
import BlogPage from "./pages/BlogPage";
import DotGrid from "./component/gsapA/DotGrid";
import VerificationOTP from "./pages/formPage/VarificationOTP";
import ResetPassword from "./pages/formPage/ResetPassword";
import UserBlog from "./pages/UserBlog";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      {/* Background only (behind all content) */}
      {/* <div className="fixed inset-0 -z-10 bg-black">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="black"
          activeColor="blue"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div> */}

      {/* Main App Content */}
      <Navbar />
      <div className="mt-[4.2rem]">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-screen w-full">
                    <div className="spinner"></div>
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/userBlog" element={<UserBlog />} />
          <Route path="/profile" element={<UserProfileDashboard />} />

          {/* Form Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/varifyOTP" element={<VerificationOTP />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
