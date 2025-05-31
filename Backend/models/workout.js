import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    user_id: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const workoutModel = mongoose.model("Workout", workoutSchema);

export default workoutModel;
