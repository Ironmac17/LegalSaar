const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOTP, verifyOTP } = require("../services/otpService");

const sendOtpController = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }
    sendOTP(phone);
    res.json({ message: "OTP sent successfully" });
    
  } catch (error) {
    next(error);
  }
};

const verifyOtpController = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP required" });
    }

    const isValid = verifyOTP(phone, otp);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, role: "citizen" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendOtpController, verifyOtpController };
