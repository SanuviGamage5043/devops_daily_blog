import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use("/uploads", express.static("uploads")); 

// Root route
app.get("/", (req, res) => {
  res.send("Backend connected");
});

// API routes
app.use("/users", userRoutes);
app.use("/entries", entryRoutes); 

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error(err));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on port ${PORT}`)
);
