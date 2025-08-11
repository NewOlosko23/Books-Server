import express from "express";
import {
  hireBook,
  getUserHires,
  completeHire,
} from "../controllers/hireController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:bookId", protect, hireBook);
router.get("/", protect, getUserHires);
router.put("/:hireId/complete", protect, completeHire);

export default router;
