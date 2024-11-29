import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg py-4 sticky top-0 z-50">
      <div className="flex mx-auto w-4/5 items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-white">
          WorkoutBuddy
        </NavLink>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto md:opacity-100 transition-opacity bg-gray-800 md:bg-transparent ${
            isOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none md:pointer-events-auto"
          }`}
        >
          <NavLink
            to="/"
            className="block px-4 py-2 text-center hover:text-gray-300"
            activeClassName="text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/workouts"
            className="block px-4 py-2 text-center hover:text-gray-300"
            activeClassName="text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Workouts
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 py-2 text-center hover:text-gray-300"
            activeClassName="text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          {!user && (
            <NavLink
              to="/login"
              className="block px-4 py-2 text-center hover:text-gray-300"
            >
              Login
            </NavLink>
          )}

          {user && (
            <div className="flex items-center border-2 px-1 rounded-md">
              <span>{user.email}</span>
              <button
                onClick={handleLogout}
                className="block p-2 text-center text-rose-500 "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
