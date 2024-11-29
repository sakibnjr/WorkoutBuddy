import React from "react";

import { motion } from "framer-motion";

import { FaDumbbell, FaHeart, FaTrashAlt } from "react-icons/fa";

import { useWorkoutContext } from "../hooks/workoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  // Function to format the date
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    // If more than a week ago, show the actual date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };

  return (
    <motion.div
      key={workout._id}
      className="bg-white rounded-lg shadow-lg p-6 relative transform transition hover:scale-105"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: workout._id * 0.1, duration: 0.5 }}
    >
      <div className="flex  items-center mb-4">
        <FaDumbbell className="text-blue-500 text-3xl mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">{workout.title}</h2>
      </div>
      <p className="absolute right-4 top-2 bg-slate-800 text-white rounded-md px-2">
        {timeAgo(workout.createdAt)}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Category:</span> {workout.category}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Difficulty:</span> {workout.difficulty}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Reps:</span> {workout.reps}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Load:</span> {workout.load}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <FaHeart className="mr-2" />
          Add to Favorites
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 flex items-center"
          whileHover={{ scale: 1.05 }}
          onClick={handleDelete}
        >
          <FaTrashAlt className="mr-2" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WorkoutDetails;
