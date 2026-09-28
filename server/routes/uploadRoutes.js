import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    imageUrl: req.file.path,
    publicId: req.file.filename, // cloudinary sets filename as public_id
  });
});

export default router;
