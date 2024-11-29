import React from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      user: "Jane Doe",
      review: "WorkoutBuddy changed my life!",
      rating: "★★★★★",
    },

    {
      user: "Emily White",
      review: "I finally found a fitness app that keeps me motivated!",
      rating: "★★★★★",
    },

    {
      user: "Olivia Blue",
      review: "Finally reaching my fitness goals thanks to WorkoutBuddy!",
      rating: "★★★★★",
    },

    {
      user: "Ava Brown",
      review: "Easy to use and very effective. Highly recommend!",
      rating: "★★★★★",
    },
  ];

  return (
    <section className="py-20  bg-gray-800 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex w-4/5 mx-auto flex-col md:flex-row gap-6 justify-center">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <p className="text-lg font-semibold mb-2">{testimonial.user}</p>
            <p className="italic mb-2">{testimonial.review}</p>
            <p>{testimonial.rating}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
