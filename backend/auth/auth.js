import jwt from "jsonwebtoken";
import Lawyer from "../models/LawyerSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "No token, authorization denied",
        });
    }

    try {
        const token = authToken.split(" ")[1];

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

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
        console.error("Error in authentication middleware:", err);
        return res.status(401).json({ message: "Authentication failed" });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;

    let user;

    try {
        // Check if user is either a client or a lawyer
        user = await User.findById(userId) || await Lawyer.findById(userId);
    } catch (error) {
        console.error("Error in finding user:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch user" });
    }

    if (!user || !roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You are not authorized" });
    }
    next();
};
