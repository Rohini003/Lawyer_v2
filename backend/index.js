import express from "express";
import { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "../backend/Routes/routes.js";
import userRoute from "../backend/Routes/user.js";
import LawyerRoute from "./Routes/Lawyer.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Lawyer_V1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error: " + err));

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoute); //domain/api/v1/auth/register
app.use("/api/v1/users", userRoute);
app.use("/api/v1/lawyers", LawyerRoute);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
