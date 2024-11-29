import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900  text-gray-300 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto w-4/5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline Section */}
        <motion.div
          className="flex flex-col items-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-white">WorkoutBuddy</h1>
          <p className="text-gray-400 mt-2 max-w-xs">
            Empowering your fitness journey, every step of the way.
          </p>
          <motion.button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Community
          </motion.button>
        </motion.div>

        {/* Navigation Links Section */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white">Quick Links</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact and Social Media Links Section */}
        <motion.div
          className="flex flex-col items-start space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white">Connect with Us</h2>
          <p className="text-gray-400 max-w-xs">
            Follow us on social media or get in touch for any inquiries.
          </p>
          <div className="flex space-x-4 text-gray-400">
            <a
              href="https://facebook.com"
              className="hover:text-white transition"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-white transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-white transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-white transition"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:support@workoutbuddy.com"
              className="hover:text-white transition"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto w-4/5 mt-10 border-t border-gray-800 pt-6 text-center">
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} WorkoutBuddy. All rights reserved.
        </p>
        {/* <ul className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
          <li>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:text-white transition">
              FAQ
            </a>
          </li>
        </ul> */}
      </div>
    </motion.footer>
  );
};

export default Footer;
