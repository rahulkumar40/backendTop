import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form"; // New import for react-hook-form
import {
  MapPin,
  Mail,
  Zap,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle,
  Briefcase,
  User,
  MessageSquare,
} from "lucide-react";

// --- Configuration Data ---
const CONTACT_DETAILS = {
  address: "123 Tech Avenue, Suite 400, Innovation City, CA 90210",
  generalEmail: "contact@yourblogdomain.com",
  partnershipEmail: "media@yourblogdomain.com",
};

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    icon: Twitter,
    color: "text-sky-500",
    link: "#",
    hoverBg: "hover:bg-sky-50",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-700",
    link: "#",
    hoverBg: "hover:bg-blue-50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    link: "#",
    hoverBg: "hover:bg-pink-50",
  },
];

// --- Form Components ---

const ContactForm = () => {
  // State: idle, loading, success, error
  const [status, setStatus] = useState("idle");

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset, // Function to clear the form fields
    formState: { errors, isValid, isDirty }, // Get errors and form state
  } = useForm({
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data) => {
    setStatus("loading");

    // Simulate API submission delay (replace this with your actual Express backend call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form Submitted (Data Validated by react-hook-form):", data);

      setStatus("success");
      reset(); // Clear form fields on success
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  // Reusable Input Field Component within ContactForm to access RHF context and status
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: Icon,
    validationRules = {},
  }) => {
    const error = errors[name];

    return (
      <div className="space-y-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 flex items-center"
        >
          {Icon && <Icon className="w-4 h-4 mr-1 text-indigo-500" />} {label}
        </label>
        <input
          id={name}
          type={type}
          // Apply register function from RHF
          {...register(name, validationRules)}
          className={`w-full px-4 py-3 border rounded-xl shadow-inner text-gray-800 transition duration-150 disabled:bg-gray-50 disabled:cursor-not-allowed
                        ${
                          error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        }`}
          placeholder={placeholder}
          disabled={status === "loading"}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center"
            >
              <Zap className="w-4 h-4 mr-1" /> {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Reusable Text Area Field Component
  const TextAreaField = ({
    label,
    name,
    rows = 5,
    placeholder,
    validationRules = {},
  }) => {
    const error = errors[name];

    return (
      <div className="space-y-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 flex items-center"
        >
          <MessageSquare className="w-4 h-4 mr-1 text-indigo-500" /> {label}
        </label>
        <textarea
          id={name}
          name={name}
          rows={rows}
          {...register(name, validationRules)}
          className={`w-full px-4 py-3 border rounded-xl shadow-inner text-gray-800 transition duration-150 disabled:bg-gray-50 disabled:cursor-not-allowed
                        ${
                          error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        }`}
          placeholder={placeholder}
          disabled={status === "loading"}
        ></textarea>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center"
            >
              <Zap className="w-4 h-4 mr-1" /> {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-10 bg-white rounded-3xl shadow-2xl border border-indigo-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Send Us a Message
      </h2>
      <p className="text-gray-500 mb-8">
        All messages are confidential. We aim to respond within 24 business
        hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <InputField
            label="Full Name"
            name="name"
            icon={User}
            placeholder="Jane Doe"
            validationRules={{ required: "Full Name is required" }}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            name="email"
            type="email"
            icon={Mail}
            placeholder="jane.doe@example.com"
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
          />
        </div>

        {/* Subject */}
        <InputField
          label="Subject"
          name="subject"
          icon={Briefcase}
          placeholder="I have a question about partnership..."
          validationRules={{ required: "Subject is required" }}
        />

        {/* Message */}
        <TextAreaField
          label="Your Message"
          name="message"
          placeholder="Write your detailed message here..."
          validationRules={{
            required: "Message content is required",
            minLength: {
              value: 20,
              message: "Message must be at least 20 characters",
            },
          }}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <motion.button
            type="submit"
            // Disable button if loading, successful, or form is invalid/untouched
            disabled={status === "loading" || status === "success" || !isValid}
            whileHover={{
              scale:
                status === "loading" || status === "success" || !isValid
                  ? 1
                  : 1.01,
            }}
            whileTap={{
              scale:
                status === "loading" || status === "success" || !isValid
                  ? 1
                  : 0.99,
            }}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Framer Motion Status Messages */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-6 p-4 rounded-xl font-semibold flex items-center shadow-md ${
              status === "success"
                ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                : "bg-red-100 text-red-700 border-l-4 border-red-500"
            }`}
          >
            {status === "success" ? (
              <>
                <CheckCircle className="w-5 h-5 mr-3" />
                Success! Your message has been sent. We'll be in touch.
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-3" />
                Error! Submission failed. Please check your network and try
                again.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Detail Components (No changes, included for completeness) ---

const DetailCard = ({ icon: Icon, title, content, link, linkText }) => (
  <motion.div
    whileHover={{
      translateY: -3,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}
    transition={{ duration: 0.3 }}
    className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md border border-indigo-100 cursor-default"
  >
    <Icon className="flex-shrink-0 w-6 h-6 text-indigo-500 mt-1" />
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{content}</p>
      {link && (
        <a
          href={link}
          className="text-indigo-600 hover:underline text-sm font-medium block mt-1"
        >
          {linkText}
        </a>
      )}
    </div>
  </motion.div>
);

const SocialLinks = () => (
  <div className="pt-4 border-t border-gray-100 mt-8">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
    <div className="flex space-x-4">
      {SOCIAL_LINKS.map((item) => (
        <motion.a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full transition duration-150 ${item.hoverBg}`}
          title={`Follow us on ${item.name}`}
        >
          <item.icon className={`w-7 h-7 ${item.color}`} fill="currentColor" />
        </motion.a>
      ))}
    </div>
  </div>
);

// --- Main App Component (No changes, included for completeness) ---

const ContactPage = () => {
  return (
    // Global styling setup
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #f4f7f9; /* Light subtle background */
                    }
                    .hero-section {
                        /* Using a subtle, professional dark blue gradient */
                        background-image: linear-gradient(135deg, rgba(23, 30, 71, 0.95), rgba(16, 21, 51, 0.95)), 
                                        url('https://placehold.co/1200x600/172554/ffffff?text=Modern+Workspace');
                        background-size: cover;
                        background-position: center;
                    }
                    /* Ensure focus rings match Tailwind defaults */
                    input:focus, textarea:focus {
                        outline: 2px solid transparent;
                        outline-offset: 2px;
                        --tw-ring-opacity: 1;
                        --tw-ring-color: #4f46e5; /* Indigo-600 */
                    }
                `}
      </style>

      <div id="contact-app" className="min-h-screen">
        {/* 1. Hero Section: Top Level and Impressive */}
        <section className="hero-section py-24 sm:py-32 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-indigo-300 font-semibold mb-3 tracking-widest uppercase text-sm"
            >
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight"
            >
              Connect with Our Expert Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl font-light max-w-3xl mx-auto opacity-80"
            >
              Whether it's a media inquiry, support question, or collaboration
              idea, we're ready to hear from you.
            </motion.p>
            <motion.a
              href="#form-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xl transition duration-300 transform"
            >
              Start a Conversation
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* 2. Main Content Area (Details and Form) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-16 px-4 sm:px-6 lg:px-8"
        >
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-3 mb-6">
              Our Contact Info
            </h2>

            <DetailCard
              icon={MapPin}
              title="Office Location"
              content={CONTACT_DETAILS.address}
              link="https://maps.google.com"
              linkText="View on Map"
            />

            <DetailCard
              icon={Mail}
              title="General Enquiries"
              content="For general questions or support."
              link={`mailto:${CONTACT_DETAILS.generalEmail}`}
              linkText={CONTACT_DETAILS.generalEmail}
            />

            <DetailCard
              icon={Briefcase}
              title="Partnership & Media"
              content="For collaboration and press inquiries."
              link={`mailto:${CONTACT_DETAILS.partnershipEmail}`}
              linkText={CONTACT_DETAILS.partnershipEmail}
            />

            {/* Social Media Links */}
            <SocialLinks />
          </div>

          {/* Contact Form Section */}
          <div id="form-section" className="lg:col-span-2">
            <ContactForm />
          </div>
        </motion.div>

        {/* 3. Other Section: Call to Action / Careers */}
        <section className="bg-white py-16 sm:py-20 mt-8 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
              Interested in Joining Our Team?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              We're always looking for passionate people to contribute to our
              mission. Check out our career opportunities.
            </p>
            <motion.a
              href="#"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 15px rgba(67, 56, 202, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-10 py-3 border-2 border-indigo-600 text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition duration-300 shadow-md"
            >
              <User className="w-5 h-5 mr-2" />
              Explore Careers
            </motion.a>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            &copy; 2025 Professional Blog. Powered by React & Framer Motion.
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;
