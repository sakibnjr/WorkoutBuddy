import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaPlusCircle,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

import { useWorkoutContext } from "../hooks/workoutContext.jsx";
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutPage = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://workoutbuddy-fzqj.onrender.com/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch, user]);

  const filteredWorkouts = workouts?.filter((workout) => {
    switch (filter) {
      case "completed":
        return workout.completed === true;
      case "pending":
        return workout.completed === false;
      default:
        return true;
    }
  });

  const completedWorkouts = workouts?.filter(
    (workout) => workout.completed === true
  );
  const pendingWorkouts = workouts?.filter(
    (workout) => workout.completed === false
  );

  // Calculate completion rate
  const completionRate = workouts?.length
    ? Math.round((completedWorkouts?.length / workouts.length) * 100)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Workouts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress and stay motivated on your fitness journey
          </p>
        </motion.div>

        {/* Combined Progress and Stats Section */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Section */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Overall Progress
                </h3>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  <span className="font-semibold">{completionRate}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-rose-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{completedWorkouts?.length || 0} completed</span>
                <span>{pendingWorkouts?.length || 0} pending</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Completed
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {completedWorkouts?.length || 0}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FaClock className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Pending
                  </span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingWorkouts?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter and Add Workout Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                filter === "all"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter("all")}
            >
              <FaChartLine />
              All Workouts
            </motion.button>
            <motion.button
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                filter === "completed"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter("completed")}
            >
              <FaCheckCircle />
              Completed
            </motion.button>
            <motion.button
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                filter === "pending"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter("pending")}
            >
              <FaClock />
              Pending
            </motion.button>
          </div>

          {/* Add Workout Button */}
          <motion.button
            className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg shadow-lg hover:bg-rose-600 flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink to="/add-workout" className="flex items-center gap-2">
              <FaPlusCircle />
              Add New Workout
            </NavLink>
          </motion.button>
        </div>

        {/* Workout Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
          >
            {filteredWorkouts &&
              filteredWorkouts.map((workout) => (
                <motion.div key={workout._id} variants={itemVariants} layout>
                  <WorkoutDetails workout={workout} />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {(!filteredWorkouts || filteredWorkouts.length === 0) && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-500 text-lg">
              No workouts found. Start by adding a new workout!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
