import express from "express";
import { createContact, deleteContact, listContacts, markContactRead } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", protect, isAdmin, listContacts);
router.patch("/:id/read", protect, isAdmin, markContactRead);
router.delete("/:id", protect, isAdmin, deleteContact);

export default router;
