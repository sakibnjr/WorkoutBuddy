import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

import { useWorkoutContext } from "../hooks/workoutContext.jsx";
import WorkoutDetails from "../components/WorkoutDetails.jsx";

import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutPage = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, workouts, user]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Workouts</h1>
          <p className="text-lg text-gray-600">
            Explore our diverse range of workouts to meet your fitness goals!
          </p>
        </motion.div>

        {/* Add Workout Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            className="flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            <NavLink to="/add-workout" className="flex items-center">
              <FaPlusCircle className="mr-2" />
              Add New Workout
            </NavLink>
          </motion.button>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts &&
            workouts.map((workout, index) => (
              <WorkoutDetails workout={workout} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
