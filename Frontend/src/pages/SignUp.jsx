import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  useEffect(() => {
    // Password strength validation
    setPasswordStrength({
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Enhanced validation
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! Please log in.");
        setEmail("");
        setPassword("");

        localStorage.setItem("user", JSON.stringify(data));

        dispatch({ type: "LOGIN", payload: data });
        navigate("/login");
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
    }
  };

  const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-center space-x-2 text-sm">
      {met ? (
        <FaCheck className="text-green-500" />
      ) : (
        <FaTimes className="text-red-500" />
      )}
      <span className={met ? "text-green-500" : "text-gray-500"}>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
            <p className="font-medium">Success</p>
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Password Requirements:
              </p>
              <PasswordRequirement
                met={passwordStrength.length}
                text="At least 8 characters long"
              />
              <PasswordRequirement
                met={passwordStrength.hasUpperCase}
                text="Contains uppercase letter"
              />
              <PasswordRequirement
                met={passwordStrength.hasLowerCase}
                text="Contains lowercase letter"
              />
              <PasswordRequirement
                met={passwordStrength.hasNumber}
                text="Contains number"
              />
              <PasswordRequirement
                met={passwordStrength.hasSpecialChar}
                text="Contains special character"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isPasswordValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isPasswordValid}
          >
            Create Account
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
