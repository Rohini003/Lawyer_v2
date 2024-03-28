import jwt from "jsonwebtoken";
import Lawyer from "../models/LawyerSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Check if JWT_SECRET_KEY is defined
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Handle other errors
    console.error("Error in authentication middleware:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export const restrict = roles => async (req, res, next) => {
  const userId = req.userId;

  try {
    // Find user by ID
    const user = await User.findById(userId) || await Lawyer.findById(userId);

    if (!user || !roles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    }
    next();
  } catch (err) {
    console.error("Error in restrict middleware:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
