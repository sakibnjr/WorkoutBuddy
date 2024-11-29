import React from "react";
import { motion } from "framer-motion";
import { FaRunning, FaHeartbeat, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-10">
      {/* About Header */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About WorkoutBuddy
      </motion.h1>

      {/* Introduction */}
      <motion.p
        className="text-lg text-gray-300 text-center max-w-3xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        At WorkoutBuddy, we believe fitness is more than just a workout. It’s a
        journey, a commitment, and a lifestyle. Our mission is to empower you
        with the tools and community you need to elevate your fitness experience
        and achieve lasting results.
      </motion.p>

      {/* Core Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl">
        {/* Value 1 */}
        <motion.div
          className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FaRunning className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Commitment to Growth</h3>
          <p className="text-gray-400">
            We’re here to help you push past limits and unlock your full
            potential with tailored fitness plans and progress tracking.
          </p>
        </motion.div>

        {/* Value 2 */}
        <motion.div
          className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FaHeartbeat className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Passion for Health</h3>
          <p className="text-gray-400">
            Fitness is a journey. We emphasize a holistic approach to health and
            wellness, empowering you to create a lifestyle of well-being.
          </p>
        </motion.div>

        {/* Value 3 */}
        <motion.div
          className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <FaUsers className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community & Support</h3>
          <p className="text-gray-400">
            Join a supportive network of fitness enthusiasts. Connect, motivate,
            and grow together as you reach your fitness goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
