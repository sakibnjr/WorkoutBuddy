import { createContext, useReducer } from "react";

const workoutContext = createContext();

const WorkoutContextProvider = ({ children }) => {
  function workoutReducer(state, action) {
    switch (action.type) {
      case "SET_WORKOUTS":
        return { workouts: action.payload };
      case "CREATE_WORKOUT":
        return { workouts: [action.payload, ...state.workouts] };
      case "UPDATE_WORKOUT":
        return {
          ...state,
          workouts: state.workouts.map((workout) =>
            workout._id === action.payload._id ? action.payload : workout
          ),
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(workoutReducer, { workouts: [] });

  return (
    <workoutContext.Provider value={{ workouts: state.workouts, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
};

export { workoutContext, WorkoutContextProvider };
