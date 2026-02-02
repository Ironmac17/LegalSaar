const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      sparse: true,
      unique: true
    },
    email: {
      type: String,
      sparse: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: ["citizen", "admin", "super_admin"],
      default: "citizen"
    },
    language: {
      type: String,
      default: "en"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLoginAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
