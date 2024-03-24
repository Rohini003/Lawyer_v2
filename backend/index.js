import express from "express";
import { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose  from "mongoose";
import  dotenv  from "dotenv";
import authRoute from "../backend/Routes/routes.js"; // Adjusted import path

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
};

app.get("/", (req, res) => {
    res.send('Api is working');
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/newsv1")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error: " + err));

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use('/api/v1/auth', authRoute);
app.use(json());

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
