import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createAddress, deleteAddress, listAddresses, setDefaultAddress, updateAddress } from "../controllers/addressController.js";

const router = express.Router();
router.use(protect);
router.route("/").get(listAddresses).post(createAddress);
router.route("/:id").put(updateAddress).delete(deleteAddress);
router.put("/:id/default", setDefaultAddress);
export default router;
