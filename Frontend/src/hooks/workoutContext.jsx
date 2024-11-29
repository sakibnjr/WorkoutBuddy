import { workoutContext } from "../context/workoutContext.jsx";

import { useContext } from "react";

const useWorkoutContext = () => {
  const context = useContext(workoutContext);
  if (!context) {
    throw Error("Not a valid context area");
  }
  return context;
};

export { useWorkoutContext };
