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
import BlogPage from "./pages/BlogPage";
// import DotGrid from "./component/gsapA/DotGrid";
import VerificationOTP from "./pages/formPage/VarificationOTP";
import ResetPassword from "./pages/formPage/ResetPassword";
import UserBlog from "./pages/dashBoard/UserBlog";
import CreateBlogPost from "./pages/dashBoard/CreateBlogPost";
import Profile from "./pages/dashBoard/Profile";
import DashboardLayout from "./pages/dashBoard/DashboardLayout";
import PageNotFound from "./pages/PageNotfound";
import ContactPage from "./pages/ContactPage";
import AllUserBlogs from "./pages/AllUserBlogs";
import SingleBlog  from "./pages/dashBoard/SingleBlog";
const Home = lazy(() => import("./pages/Home"));
const dashBoard = lazy(() => import("./pages/dashBoard/DashboardLayout"));

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/varifyOTP" element={<VerificationOTP />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/all-blogs" element={<AllUserBlogs />} />
          <Route path="/single-blog/:_id" element={<SingleBlog />} />
          {/*Blog Related Route*/}
          // dashboard
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="My-Blogs" element={<UserBlog />} />
            <Route path="create-blog" element={<CreateBlogPost />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
