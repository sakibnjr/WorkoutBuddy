import express from "express";
import "dotenv/config";
import cors from "cors";
import dbConnect from "./configs/dbConnection.js";
import workoutRoutes from "./routes/workout.js";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

const setupConnection = () => {
  try {
    dbConnect(process.env.DB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running`);
    });
  } catch (error) {
    console.error("Error during setup:", error);
    process.exit(1);
  }
};

setupConnection();
