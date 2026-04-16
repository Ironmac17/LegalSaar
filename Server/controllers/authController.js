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

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      throw new ValidationError(phoneValidation.error);
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser && !existingUser.isActive) {
      throw new AuthenticationError("User account is deactivated");
    }

    const otpCode = await sendOTP(phone);
    if (!otpCode) {
      throw new Error("Failed to send OTP");
    }

    res.json({
      success: true,
      message: "OTP sent successfully",
      phone: phone,
      otpCode: otpCode, // For demo purposes
    });
  } catch (error) {
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) throw new ValidationError(phoneValidation.error);
    if (!name) throw new ValidationError("Name is required");
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) throw new ValidationError(passwordValidation.error);

    let user = await User.findOne({ phone });
    if (user) {
      throw new ValidationError("User already exists with this phone number");
    }

    user = await User.create({
      name,
      phone,
      password,
      role: "citizen",
      isActive: true,
      isVerified: false,
    });

    const otpCode = await sendOTP(phone);

    res.json({
      success: true,
      message: "User created. OTP sent.",
      phone: phone,
      otpCode: otpCode, // Demo
    });
  } catch (error) {
    next(error);
  }
};

const loginPasswordController = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) throw new ValidationError(phoneValidation.error);

    const user = await User.findOne({ phone, role: "citizen" });
    if (!user) throw new AuthenticationError("Invalid phone or password");
    if (!user.isActive) throw new AuthenticationError("Account deactivated");
    if (!user.isVerified) throw new AuthenticationError("Please verify your OTP first");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AuthenticationError("Invalid phone or password");

    const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        language: user.language,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtpController = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) throw new ValidationError(phoneValidation.error);
    const otpValidation = validateOTP(otp);
    if (!otpValidation.valid) throw new ValidationError(otpValidation.error);

    const isValid = verifyOTP(phone, otp);
    if (!isValid) throw new AuthenticationError("Invalid or expired OTP");

    let user = await User.findOne({ phone });
    if (!user) throw new AuthenticationError("User not found, please register.");
    if (!user.isActive) throw new AuthenticationError("User account is deactivated");

    // Mark verified
    user.isVerified = true;
    await user.save();

    const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
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
    const user = await User.findById(req.user.id).select("-password");

    if (!user) throw new AuthenticationError("User not found");
    if (!user.isActive) throw new AuthenticationError("User account is deactivated");

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

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) throw new ValidationError(emailValidation.error);
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) throw new ValidationError(passwordValidation.error);

    const admin = await User.findOne({
      email: emailValidation.value,
      role: { $in: ["admin", "super_admin"] },
    });

    if (!admin) throw new AuthenticationError("Invalid credentials");
    if (!admin.isActive) throw new AuthenticationError("Admin account is deactivated");

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) throw new AuthenticationError("Invalid credentials");

    const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
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

module.exports = { 
  sendOtpController, 
  verifyOtpController, 
  adminLoginController, 
  getCurrentUserController,
  registerController,
  loginPasswordController
};
