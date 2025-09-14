import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// MongoDB connection
const mongoURI = "mongodb://blog-mongo:27017/blogDB"; // container MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
