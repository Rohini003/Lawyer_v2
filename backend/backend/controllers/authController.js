import User from "../models/UserSchema.js";
import Lawyer from "../models/LawyerSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "15d",
        }
    );
};

export const register = async (req, res) => {
    const { email, password, photo, name, role, gender } = req.body;
    console.log(req.body);

    try {
        let user = null;

        if (role === "client") {
            user = await User.findOne({ email });
        } else if (role === "Lawyer") {
            user = await Lawyer.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        if (role === "client") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        } else if (role === "Lawyer") {
            user = new Lawyer({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }

        // Check if user was instantiated
        if (!user) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Save user to database
        await user.save();

        res.status(200).json({
            success: true,
            message: "User successfully created",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again.",
        });
    }
};

export const login = async (req, res) => {
    const { email } = req.body;

    try {
        let user = null;

        const client = await User.findOne({ email });
        const lawyer = await Lawyer.findOne({ email });

        if (client) {
            user = client;
        } else if (lawyer) {
            user = lawyer;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
};
