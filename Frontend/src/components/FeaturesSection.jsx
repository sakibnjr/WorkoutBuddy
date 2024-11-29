import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Personalized Workout Plans",
    description: "Tailored workouts for every goal.",
  },
  {
    title: "Real-Time Progress Tracking",
    description: "Track every rep, set, and gain effortlessly.",
  },
  {
    title: "Community & Motivation",
    description: "Connect with like-minded fitness enthusiasts.",
  },
  {
    title: "Classes & Challenges",
    description: "Join live classes and monthly challenges.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Why WorkoutBuddy?</h2>
      <div className="grid gap-6 w-4/5 md:grid-cols-2 lg:grid-cols-4 mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
