import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import WorkoutPage from "./pages/WorkoutPage";
import AddWorkout from "./pages/AddWorkout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/workouts"
          element={user ? <WorkoutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-workout"
          element={user ? <AddWorkout /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
