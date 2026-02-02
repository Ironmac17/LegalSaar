const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Login
router.post("/login", adminLogin);

// Example protected admin route
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  (req, res) => {
    res.json({ message: "Admin dashboard access granted" });
  }
);

module.exports = router;
