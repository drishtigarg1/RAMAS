import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

import {
  createCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Public Routes
router.get("/", getCategories);
router.get("/:slug", getCategory);

// Admin Route
router.post("/", protect, isAdmin, createCategory);

export default router;