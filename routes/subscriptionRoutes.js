import express from "express";
import {
  subscribe,
  getSubscriptionStatus,
} from "../controllers/subscriptionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", protect, subscribe);
router.get("/status", protect, getSubscriptionStatus);

export default router;
