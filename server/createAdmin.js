import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error("ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required.");
    }

    const admin = await User.findOne({ email }).select("+password");
    const account = admin || new User({ email });

    account.name = name;
    account.email = email;
    account.password = password;
    account.phone = "";
    account.role = "admin";
    account.isVerified = true;
    await account.save();

    console.log("✅ Admin account created or updated successfully.");
    console.log(`Admin email: ${account.email}`);

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("❌ Admin setup failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
