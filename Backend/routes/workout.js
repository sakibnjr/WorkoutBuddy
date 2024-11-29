import express from "express";
import {
  getAllWorkouts,
  getSingleWorkout,
  addWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

import requireAuth from "../middleware/project.js";

const router = express.Router();

router.use(requireAuth);

//Get all workouts
router.get("/", getAllWorkouts);

//Get a single workout
router.get("/:id", getSingleWorkout);

//Add a new workout
router.post("/", addWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

export default router;
