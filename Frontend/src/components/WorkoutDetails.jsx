import React from "react";

import { motion } from "framer-motion";

import { FaCheckCircle, FaDumbbell, FaFire, FaCalendarAlt } from "react-icons/fa";

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

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/workouts/" + workout._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify({ completed: !workout.completed })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update workout');
      }

      const updatedWorkout = await response.json();
      dispatch({ type: "UPDATE_WORKOUT", payload: updatedWorkout });
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {workout.completed && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-green-500 text-2xl font-bold flex items-center gap-2">
            <FaCheckCircle className="text-3xl" />
            Completed
          </div>
        </div>
      )}
      <div className={`p-6 ${workout.completed ? 'opacity-40' : ''}`}>
        {/* Header with Title and Time */}
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {workout.title}
          </h4>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <FaCalendarAlt className="text-rose-500" />
            <span>{timeAgo(workout.createdAt)}</span>
          </div>
        </div>

        {/* Workout Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaDumbbell className="text-rose-500" />
            <span className="text-sm">{workout.load} kg</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaFire className="text-rose-500" />
            <span className="text-sm">{workout.reps} reps</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className="w-full py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
        >
          <FaCheckCircle />
          {workout.completed ? "Mark as Pending" : "Mark as Complete"}
        </button>
      </div>
    </motion.div>
  );
};

export default WorkoutDetails;
