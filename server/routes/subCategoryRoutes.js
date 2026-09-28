import express from "express";

import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  restoreSubCategory,
  toggleSubCategoryStatus,
} from "../controllers/subCategoryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getSubCategories);
router.get("/:slug", getSubCategory);

// Admin Routes
router.post("/", protect, isAdmin, createSubCategory);
router.put("/:id", protect, isAdmin, updateSubCategory);
router.delete("/:id", protect, isAdmin, deleteSubCategory);
router.patch("/:id/restore", protect, isAdmin, restoreSubCategory);
router.patch("/:id/status", protect, isAdmin, toggleSubCategoryStatus);

export default router;