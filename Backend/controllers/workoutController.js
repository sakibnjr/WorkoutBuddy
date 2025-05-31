import workoutModel from "../models/workout.js";
import mongoose from "mongoose";

//get all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workout = await workoutModel.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

//get a single workouts
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await workoutModel.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//add a new workout
const addWorkout = async (req, res) => {
  const { title, reps, load, category, difficulty } = req.body;
  console.log("Request Body:", req.body);
  try {
    const user_id = req.user._id;
    console.log("User ID", user_id);
    const workout = await workoutModel.create({
      title,
      reps,
      load,
      category,
      difficulty,
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await workoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getAllWorkouts,
  getSingleWorkout,
  addWorkout,
  updateWorkout,
};
