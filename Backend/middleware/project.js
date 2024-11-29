import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    //console.log("No authorization header found");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // Decode the token
    //console.log("Decoded User ID:", _id);

    // Fetch the user from the database
    const user = await userModel.findOne({ _id }).select("_id");
    if (!user) {
      // console.log("User not found in the database");
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach the user to the req object
    // console.log("User found and added to req.user:", user);
    next(); // Proceed to the next middleware
  } catch (error) {
    // console.log("JWT verification error:", error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
