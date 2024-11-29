import React from "react";
import { motion } from "framer-motion";
import { FaDumbbell } from "react-icons/fa";

const HeroSection = () => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499290572571-a48c08140a19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTczfHxmaXRuZXNzfGVufDB8fDB8fHww')",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center space-x-3 text-red-500 mb-4">
        <FaDumbbell size={30} />
        <motion.h2
          className="text-lg font-semibold uppercase tracking-wider"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Fitness Redefined
        </motion.h2>
      </div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white text-center leading-tight"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Elevate Your Workout Experience
      </motion.h1>

      <p className="text-lg text-gray-200 mt-4 text-center max-w-md">
        Achieve your goals with personalized plans, real-time tracking, and a
        supportive community that fuels your journey.
      </p>

      <motion.button
        className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Your Journey
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
