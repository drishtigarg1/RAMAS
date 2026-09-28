import express from "express";

import {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  restoreBrand,
  toggleBrandStatus,
} from "../controllers/brandController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getBrands);
router.get("/:slug", getBrand);

// Admin Routes
router.post("/", protect, isAdmin, createBrand);
router.put("/:id", protect, isAdmin, updateBrand);
router.delete("/:id", protect, isAdmin, deleteBrand);
router.patch("/:id/restore", protect, isAdmin, restoreBrand);
router.patch("/:id/status", protect, isAdmin, toggleBrandStatus);

export default router;