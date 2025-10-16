import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
// import '../App.css'
// Dummy data for featured posts and testimonials
const featuredPosts = [
  {
    id: 1,
    title: "How to Build a MERN Blog from Scratch",
    summary:
      "Step-by-step guide for beginners to launch their first blog using the MERN stack.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    link: "/blog/1",
  },
  {
    id: 2,
    title: "Tailwind CSS: Modern UI for Developers",
    summary:
      "Discover why Tailwind CSS is a game changer for rapid, beautiful UI design.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Mastering Framer Motion for React",
    summary:
      "Add stunning animations to your React apps with ease and flexibility.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "/blog/3",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "TopBlog is the perfect platform to share my development journey! The community is awesome and the UI is beautiful.",
  },
  {
    name: "Amit Singh",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "I learned so much from the featured blogs and connected with other devs. Superb experience!",
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [userData, setDoYou] = useState(false);
  const SubHeading = () => {
    return (
      <div>
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "Share, Learn, and Inspire Across Tech", // initially rendered starting point
            1000,
            "Share, Learn, and Inspire Across Medical ",
            1000,
            "Share, Learn, and Inspire Across Education",
            1000,
            "Share, Learn, and Inspire Across Art",
            1000,
            "Share, Learn, and Inspire Across Personal",
            1000,
            "Share, Learn, and Inspire Across Social",
            1000,
            "Share, Learn, and Inspire Across Travel",
            1000,
            "Share, Learn, and Inspire Across Culture",
            1000,
            "Share, Learn, and Inspire Across Hobbies",
            1000,
            "Share, Learn, and Inspire Across LifeStyle",
            1000,
            "Share, Learn, and Inspire Across Business",
            500,
          ]}
          speed={50}
          //   style={{ fontSize: "2em" }}
          repeat={Infinity}
        />
      </div>
    );
  };
  function WhyTopBlog() {
    return (
      <section className="bg-white py-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.h2
            className="text-3xl font-bold text-indigo-700 mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            Why TopBlog?
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
          >
            TopBlog is where people from every profession and passion come
            together to share, connect, and grow.
            <br />
            <span className="font-semibold text-indigo-600">
              Our mission: Empower everyone to tell their story, exchange ideas,
              and learn from one another—no matter their background.
            </span>
          </motion.p>
          <NavLink
            to="/about"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-500 transition"
          >
            Learn More About Us
          </NavLink>
        </div>
      </section>
    );
  }

  // future use
  //   function DoYouWant() {
  //     return (
  //       <div className="h-[150px] w-[200px] relative">
  //         <h2>Message</h2>
  //         <p>Do you realy want to delete this message...</p>
  //         <Link to="/about">
  //           <button>Delete</button>
  //         </Link>
  //         <button
  //           className="absolute right-0 top-0 text-[2.5rem] font-bold "
  //           onClick={() => setDoYou(!doYou)}
  //         >
  //           x
  //         </button>
  //       </div>
  //     );
  //   }
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col ">
      {/* HERO SECTION */}
      <section className="pt-28 pb-16 bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-400 flex flex-col items-center relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          className="text-center px-6"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">TopBlog</span>
          </h1>

          <div className="ml-[6rem]">
            <h2 className="text-xl sm:text-3xl text-gray-100 max-w-2xl mx-auto text-left font-medium drop-shadow-md mb-4">
              <SubHeading />
            </h2>
          </div>

          <p className="sm:text-[1rem] text-gray-100 mb-8 max-w-2xl mx-auto font-medium drop-shadow-md">
            From tech innovations to life lessons, medical breakthroughs to{" "}
            <br /> creative journeys—every story finds a home here.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-yellow-400 text-indigo-800 hover:bg-yellow-300 rounded-full px-8 py-3 text-lg cursor-pointer font-bold shadow-lg transition"
          >
            Start Your Journey
          </Link>
        </motion.div>
        {/* Decorative Circles */}
        <motion.div
          animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute right-10 bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          className="absolute left-10 top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
        />
      </section>

      {/* INTRODUCTION & CTA */}
      <section className="bg-white py-10">
        <WhyTopBlog />
      </section>

      {/* FEATURED BLOG POSTS */}
      <section className="py-14 bg-gradient-to-r from-indigo-50 via-purple-100 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Blogs
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, i) => (
              <motion.a
                href={post.link}
                key={post.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-indigo-700 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 flex-1">{post.summary}</p>
                  <span className="mt-4 inline-block text-indigo-600 font-semibold hover:underline">
                    Read More →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col items-center text-center"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-4 border-indigo-300 mb-4"
                />
                <p className="text-gray-700 italic mb-2">"{t.text}"</p>
                <span className="mt-1 font-semibold text-indigo-700">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-10 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to share your story?
          </h2>
          <a
            href="/signup"
            className="inline-block bg-yellow-400 text-indigo-800 hover:bg-yellow-300 rounded-full px-8 py-3 text-lg font-bold shadow-lg transition"
          >
            Join TopBlog Now
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-indigo-700">TopBlog</span>
            <span className="text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-indigo-600">
              Privacy Policy
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600"
            >
              <svg
                className="w-5 h-5 inline mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.9 9.9 0 01-2.828.775A4.932 4.932 0 0023.338 3.1a9.864 9.864 0 01-3.127 1.195A4.92 4.92 0 0016.616 2c-2.73 0-4.942 2.21-4.942 4.933 0 .386.045.762.127 1.124A13.978 13.978 0 013.16 3.167a4.918 4.918 0 001.528 6.573A4.904 4.904 0 012.8 9.097v.063a4.934 4.934 0 003.95 4.827 4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.604 3.417A9.868 9.868 0 010 21.543a13.945 13.945 0 007.548 2.212c9.056 0 14.009-7.496 14.009-13.985 0-.213-.005-.425-.015-.636A9.936 9.936 0 0024 4.557z" />
              </svg>
              Twitter
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600"
            >
              <svg
                className="w-5 h-5 inline mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.424 2.867 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.159-1.11-1.468-1.11-1.468-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.221-.252-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.104-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.545 1.378.203 2.395.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.697-4.566 4.945.359.309.678.92.678 1.856 0 1.339-.012 2.421-.012 2.751 0 .267.18.579.688.48C19.135 20.197 22 16.442 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
        {/* <div className="relative ">
          <p>Try Kr Do</p>
          {doYou ? (
            <div className="absolute right-[50%] bottom-0 bg-gradient-to-br to-sky-400 via-orange-400 from-fuchsia-300">
              <DoYouWant className="" />
            </div>
          ) : (
            <button onClick={() => setDoYou(!doYou)}>Delete</button>
          )}
        </div>
        <div className="relative ">
          <p>Try Kr Do</p>
          {doYou ? (
            <div className="absolute right-[50%] bottom-0 bg-gradient-to-br to-sky-400 via-orange-400 from-fuchsia-300">
              <DoYouWant className="" />
            </div>
          ) : (
            <button onClick={() => setDoYou(!doYou)}>Delete</button>
          )}
        </div> */}
      </footer>
    </div>
  );
}
