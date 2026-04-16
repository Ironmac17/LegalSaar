const express = require("express");
const {
  sendOtpController,
  verifyOtpController,
  adminLoginController,
  getCurrentUserController,
  registerController,
  loginPasswordController
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/register", registerController);
router.post("/login-password", loginPasswordController);
router.post("/admin-login", adminLoginController);

// Protected route to get current user
router.get("/me", authMiddleware, getCurrentUserController);

module.exports = router;
