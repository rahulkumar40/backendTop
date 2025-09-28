import React from "react";
import { motion } from "framer-motion";
import story from ".././assets/blogStory.png";

import mission from ".././assets/blogMission.png";
// banner image (replace with your own or a relevant Unsplash image)
const bannerImg =
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80";

// example avatars for community
const avatars = [
  "https://randomuser.me/api/portraits/men/85.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/women/25.jpg",
];

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen pt-0">
      {/* Banner/Hero */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Share your knowledge and inspire"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
            About <span className="text-yellow-300">TopBlog</span>
          </h1>
          <p className="mt-3 text-xl text-white font-medium drop-shadow-lg max-w-2xl mx-auto">
            A global community for every voice — share your knowledge, stories,
            and inspiration with the world.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-800/80 to-transparent" />
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <img
              src={story}
              alt="Community"
              className="rounded-3xl shadow-xl w-full max-h-96 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              TopBlog began with a vision:{" "}
              <span className="font-semibold text-indigo-700">
                every story deserves an audience.
              </span>{" "}
              We believe knowledge, creativity, and experience should flow
              freely across all boundaries—whether you’re in tech, medicine,
              art, or any field.
            </p>
            <p className="text-gray-700">
              Our platform welcomes everyone to share insights, lessons, and
              ideas. We’re building bridges, not silos, so that learning and
              inspiration never stop.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="md:order-2"
          >
            <img
              src={mission}
              alt="Mission"
              className="rounded-3xl shadow-xl w-full max-h-96 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-pink-700 mb-3">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-pink-600">
                Empower every individual
              </span>
              —regardless of background or expertise—to share, learn, and
              connect globally.
            </p>
            <ul className="list-disc pl-4 text-gray-700 space-y-2">
              <li>
                Eliminate barriers to publishing and discussion for all fields:
                technology, medicine, academia, lifestyle, art, and more.
              </li>
              <li>
                Foster a culture of curiosity, mutual respect, and lifelong
                learning.
              </li>
              <li>
                Make knowledge, personal stories, and creative ideas accessible
                to everyone.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Unique Points / Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-3xl font-bold text-yellow-600 mb-8 text-center"
          >
            What Makes Us Unique?
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl bg-indigo-50 p-6 text-center shadow-md"
            >
              <span className="inline-block bg-indigo-600 text-white rounded-full w-12 h-12 mb-3 flex items-center justify-center text-2xl font-bold shadow">
                🌐
              </span>
              <h3 className="font-semibold text-indigo-700 mb-1">
                Truly Diverse
              </h3>
              <p className="text-gray-700 text-sm">
                Open for every field—tech, health, art, business, education, and
                beyond.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl bg-pink-50 p-6 text-center shadow-md"
            >
              <span className="inline-block bg-pink-500 text-white rounded-full w-12 h-12 mb-3 flex items-center justify-center text-2xl font-bold shadow">
                💡
              </span>
              <h3 className="font-semibold text-pink-700 mb-1">
                Community-Driven
              </h3>
              <p className="text-gray-700 text-sm">
                Engage with posts, comments, replies, likes, and real
                conversation.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl bg-yellow-50 p-6 text-center shadow-md"
            >
              <span className=" bg-yellow-400 inline-block text-white rounded-full w-12 h-12 mb-3 flex items-center justify-center text-2xl font-bold shadow">
                🎨
              </span>
              <h3 className="font-semibold text-yellow-700 mb-1">
                Modern & Inclusive
              </h3>
              <p className="text-gray-700 text-sm">
                Beautiful, accessible design. Works everywhere, for everyone.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl bg-green-50 p-6 text-center shadow-md"
            >
              <span className="inline-block bg-green-500 text-white rounded-full w-12 h-12 mb-3 flex items-center justify-center text-2xl font-bold shadow">
                🚀
              </span>
              <h3 className="font-semibold text-green-700 mb-1">For Growth</h3>
              <p className="text-gray-700 text-sm">
                Share ideas, gain new perspectives, and connect with
                opportunity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof / Community */}
      <section className="py-14 bg-gradient-to-br from-indigo-50 via-yellow-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4">
            Our Global Community
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users from all backgrounds, countries, and
            professions.
          </p>
          <div className="flex justify-center gap-4 mb-4">
            {avatars.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt="Community Member"
                className="w-16 h-16 rounded-full border-4 border-indigo-200 shadow"
                style={{ marginLeft: i === 0 ? 0 : -20 }}
              />
            ))}
            <span className="ml-4 font-semibold text-indigo-700 text-lg self-center">
              + more
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Priya Sharma"
                className="w-14 h-14 rounded-full border-4 border-yellow-200 mb-2"
              />
              <p className="text-gray-700 italic mb-2">
                "I’ve learned so much from stories outside my own field. TopBlog
                is truly for everyone."
              </p>
              <span className="font-semibold text-indigo-700">
                Priya Sharma, India
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="Amit Singh"
                className="w-14 h-14 rounded-full border-4 border-green-200 mb-2"
              />
              <p className="text-gray-700 italic mb-2">
                "Medical, tech, arts—everyone has a story here. The community is
                inspiring and supportive."
              </p>
              <span className="font-semibold text-indigo-700">
                Amit Singh, UK
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to share your story?
          </h2>
          <a
            href="/signup"
            className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 rounded-full px-8 py-3 text-lg font-bold shadow-lg transition"
          >
            Join TopBlog Now
          </a>
        </div>
      </section>
    </div>
  );
}
