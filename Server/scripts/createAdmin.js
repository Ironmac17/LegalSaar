const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const { hashPassword } = require("../services/passwordService");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@legalaccess.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const password = await hashPassword("admin123");

    await User.create({
      email: "admin@legalaccess.com",
      password,
      role: "admin"
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
