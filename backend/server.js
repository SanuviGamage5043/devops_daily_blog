import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend connected");
});

// API routes
app.use("/users", userRoutes);

// MongoDB connection
const mongoURI = "mongodb://blog-mongo:27017/blogDB"; // container MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
