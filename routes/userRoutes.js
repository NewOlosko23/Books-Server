import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);

export default router;
