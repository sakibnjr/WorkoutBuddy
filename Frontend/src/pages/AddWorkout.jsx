import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaFire, FaWeightHanging, FaChartLine, FaLayerGroup } from "react-icons/fa";
import { useWorkoutContext } from "../hooks/workoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddWorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const navigate = useNavigate();
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
      toast.error("Please login to add a workout");
      return;
    }

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
        toast.error(data.message || "Failed to add workout!");
      } else {
        setFormData({
          title: "",
          reps: "",
          load: "",
          difficulty: "Beginner",
          category: "Strength",
        });
        toast.success("Workout added successfully!");
        setTimeout(() => {
          navigate("/workouts");
        }, 1500);
        dispatch({ type: "CREATE_WORKOUT", payload: data });
      }
    } catch (error) {
      toast.error("Network error! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto w-4/5">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Form Header */}
          <div className="bg-gray-800 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Add New Workout</h2>
            <p className="text-rose-100">Track your fitness journey with a new workout</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaDumbbell className="text-rose-500" />
                Workout Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter workout title"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                required
              />
            </div>

            {/* Reps and Load Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Reps Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <FaFire className="text-yellow-500" />
                  Repetitions
                </label>
                <input
                  type="number"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="Number of reps"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>

              {/* Load Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <FaWeightHanging className="text-green-500" />
                  Load
                </label>
                <input
                  type="text"
                  name="load"
                  value={formData.load}
                  onChange={handleChange}
                  placeholder="Weight or resistance"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Difficulty and Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Difficulty Select */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <FaChartLine className="text-rose-500" />
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <FaLayerGroup className="text-rose-500" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
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
              className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-rose-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDumbbell />
              Add Workout
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddWorkoutForm;
