import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import SubCategory from "./models/SubCategory.js";
import Brand from "./models/Brand.js";

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI or MONGODB_URI environment variable is required.");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected for Seeding...");

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Brand.deleteMany();

    // 1. Create Users
    const adminUser = await User.create({
      name: "Admin Manager",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
      isVerified: true,
    });

    const buyerUser = await User.create({
      name: "Happy Buyer",
      email: "buyer@example.com",
      password: "password123",
      role: "user",
      isVerified: true,
    });

    console.log("Users Seeded: admin@example.com & buyer@example.com (pw: password123)");

    // 2. Create Categories
    const catStationery = await Category.create({ name: "Stationery", slug: "stationery" });
    const catOffice = await Category.create({ name: "Office Supplies", slug: "office-supplies" });
    const catSports = await Category.create({ name: "Sports", slug: "sports" });
    const catArt = await Category.create({ name: "Art & Craft", slug: "art-and-craft" });

    // 3. Create SubCategories
    const subPens = await SubCategory.create({ name: "Pens", slug: "pens", category: catStationery._id });
    const subNotebooks = await SubCategory.create({ name: "Notebooks", slug: "notebooks", category: catStationery._id });
    
    // 4. Create Brands
    const brandParker = await Brand.create({ name: "Parker", slug: "parker" });
    const brandClassmate = await Brand.create({ name: "Classmate", slug: "classmate" });

    // 5. Create Products
    await Product.create([
      {
        name: "Parker Vector Pen",
        description: "Premium Rollerball Pen",
        price: 250,
        originalPrice: 300,
        countInStock: 50,
        images: [{ url: "https://via.placeholder.com/150", public_id: "p1" }],
        category: catStationery._id,
        subCategory: subPens._id,
        brand: brandParker._id,
        rating: 4.5,
        reviews: 10
      },
      {
        name: "Classmate Notebook 6-Pack",
        description: "A4 Size, 160 pages, single line",
        price: 350,
        originalPrice: 400,
        countInStock: 100,
        images: [{ url: "https://via.placeholder.com/150", public_id: "p2" }],
        category: catStationery._id,
        subCategory: subNotebooks._id,
        brand: brandClassmate._id,
        rating: 4.8,
        reviews: 25
      },
      {
        name: "Office Desk Organizer",
        description: "Metal mesh desk organizer",
        price: 499,
        originalPrice: 600,
        countInStock: 30,
        images: [{ url: "https://via.placeholder.com/150", public_id: "p3" }],
        category: catOffice._id,
        rating: 4.2,
        reviews: 8
      },
      {
        name: "Yonex Badminton Racket",
        description: "Lightweight carbon fiber racket",
        price: 1500,
        originalPrice: 1800,
        countInStock: 15,
        images: [{ url: "https://via.placeholder.com/150", public_id: "p4" }],
        category: catSports._id,
        rating: 4.9,
        reviews: 40
      }
    ]);

    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
