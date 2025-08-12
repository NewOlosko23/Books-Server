import express from "express";
import {
  getAllUsers,
  getUserById,
  getBooksByUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:id/books", getBooksByUser);

export default router;
