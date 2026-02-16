const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOTP, verifyOTP } = require("../services/otpService");
const {
  validatePhone,
  validateOTP,
  validateEmail,
  validatePassword,
} = require("../utils/validation");
const {
  ValidationError,
  AuthenticationError,
} = require("../utils/errors");

const sendOtpController = async (req, res, next) => {
  try {
    const { phone } = req.body;

    // Validate phone
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      throw new ValidationError(phoneValidation.error);
    }

    // Check if user exists
    const existingUser = await User.findOne({ phone });
    if (existingUser && !existingUser.isActive) {
      throw new AuthenticationError("User account is deactivated");
    }

    // Send OTP
    const sent = await sendOTP(phone);
    if (!sent) {
      throw new Error("Failed to send OTP");
    }

    res.json({
      success: true,
      message: "OTP sent successfully",
      phone: phone.substring(phone.length - 2) === "**" ? phone : phone.slice(0, -2) + "**"
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtpController = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    // Validate inputs
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      throw new ValidationError(phoneValidation.error);
    }

    const otpValidation = validateOTP(otp);
    if (!otpValidation.valid) {
      throw new ValidationError(otpValidation.error);
    }

    // Verify OTP
    const isValid = verifyOTP(phone, otp);
    if (!isValid) {
      throw new AuthenticationError("Invalid or expired OTP");
    }

    // Find or create user
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role: "citizen",
        isActive: true,
      });
    } else if (!user.isActive) {
      throw new AuthenticationError("User account is deactivated");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        language: user.language,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    // User is attached to request by authMiddleware
    const user = await User.findById(req.user.id).select("-password -otp -otpExpiry");

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    if (!user.isActive) {
      throw new AuthenticationError("User account is deactivated");
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role,
        language: user.language,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      throw new ValidationError(emailValidation.error);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      throw new ValidationError(passwordValidation.error);
    }

    // Find admin user
    const admin = await User.findOne({
      email: emailValidation.value,
      role: { $in: ["admin", "super_admin"] },
    });

    if (!admin) {
      throw new AuthenticationError("Invalid credentials");
    }

    if (!admin.isActive) {
      throw new AuthenticationError("Admin account is deactivated");
    }

    // Verify password (assuming bcrypt is used in model)
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendOtpController, verifyOtpController, adminLoginController, getCurrentUserController };
