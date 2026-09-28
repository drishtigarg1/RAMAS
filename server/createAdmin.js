import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@ramastationers.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit();
    }

    const admin = await User.create({
      name: "Roshan Kumar Singh",
      email: "admin@ramastationers.com",
      password: "Admin@123456",
      phone: "",
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin Created Successfully");
    console.log(admin.email);

    process.exit();

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

createAdmin();