const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔑 Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// @route   POST /api/admin/login
// @desc    Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(400).json({ error: "Invalid username" });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // ✅ Generate JWT
  const token = jwt.sign({ username }, "yourSecretKey", { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;