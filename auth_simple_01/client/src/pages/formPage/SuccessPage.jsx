import React from 'react';
import { motion } from 'framer-motion';

// Example Icon Component (You can replace this with your own SVG or an image)
const SuccessIcon = () => (
    <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg"
    >
        ✓
    </motion.div>
);

/**
 * A reusable success page component.
 * @param {object} props
 * @param {string} props.title - The main heading (e.g., "Success!", "Password Reset").
 * @param {string} props.message - A descriptive message for the user.
 * @param {string} props.link - The URL for the primary call-to-action button.
 * @param {string} props.buttonText - The text for the primary call-to-action button.
 */
export default function SuccessPage({ 
    title = "Success!", 
    message = "Your action was completed successfully.", 
    link = "/", 
    buttonText = "Go to Homepage" 
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white shadow-2xl rounded-xl p-8 sm:p-12 text-center max-w-lg w-full"
            >
                <div className="flex justify-center mb-6">
                    <SuccessIcon />
                </div>
                <h1 className="text-4xl font-extrabold text-green-600 mb-2">
                    {title}
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    {message}
                </p>
                <motion.a
                    href={link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition-colors text-lg"
                >
                    {buttonText}
                </motion.a>
            </motion.div>
        </div>
    );
}