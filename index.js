import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import hireRoutes from "./routes/hireRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/hire", hireRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Book Rental API");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
