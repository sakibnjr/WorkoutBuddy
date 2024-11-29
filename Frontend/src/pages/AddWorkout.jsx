import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useWorkoutContext } from "../hooks/workoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddWorkoutForm = () => {
  const { dispatch } = useWorkoutContext();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    load: "",
    difficulty: "Beginner",
    category: "Strength",
  });

  const { user } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Login to add workout");
      return;
    }

    // Destructure formData here
    const { title, reps, load, difficulty, category } = formData;

    try {
      const response = await fetch("http://localhost:4000/api/workouts/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "An error occurred while adding the workout.");
        toast.error(data.message || "Failed to add workout!");
      } else {
        // Clear form data if the post request is successful
        setFormData({
          title: "",
          reps: "",
          load: "",
          difficulty: "Beginner",
          category: "Strength",
        });
        setError(""); // Clear any previous errors
        toast.success("Workout added successfully!");
        // Navigate to the homepage after a short delay
        // setTimeout(() => {
        //   navigate("/workouts");
        // }, 1500); // Adjust delay as needed
        dispatch({ type: "CREATE_WORKOUT", payload: data });
      }
    } catch (error) {
      setError("Failed to connect to the server.");
      toast.error("Network error! Please try again later.");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center bg-gray-100 py-10 px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Workout
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Workout Title, Reps, Load - Flex layout on large screens */}
          <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4 mb-4">
            {/* Workout Title */}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Workout Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter workout title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* Reps */}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Reps
              </label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                placeholder="Enter number of reps"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* Load */}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Load
              </label>
              <input
                type="text"
                name="load"
                value={formData.load}
                onChange={handleChange}
                placeholder="Enter load (e.g., 10 kg, Bodyweight)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Difficulty Level and Category - Flex layout on large screens */}
          <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4 mb-6">
            {/* Difficulty Level */}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Category */}
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Endurance">Endurance</option>
                <option value="Balance">Balance</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            whileHover={{ scale: 1.05 }}
          >
            Add Workout
          </motion.button>
          <p>{error}</p>
        </form>
      </motion.div>
    </div>
  );
};

export default AddWorkoutForm;
