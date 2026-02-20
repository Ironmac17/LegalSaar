const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await User.findOne({ email, role: { $in: ["admin", "super_admin"] } });

    if (!admin || !admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Use the comparePassword method from User model
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    admin.lastLoginAt = new Date();
    await admin.save();

    res.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { adminLogin };
