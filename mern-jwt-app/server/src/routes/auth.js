const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// TODO: Move this to a .env file later
const JWT_SECRET = "your_jwt_secret_key_here";

// ===========================
// REGISTER ROUTE
// ===========================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create User
    // CRITICAL: We pass the PLAIN password here.
    // Your User.js 'pre save' hook will handle the hashing automatically.
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    // 3. Generate Token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: { id: newUser._id, username, email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===========================
// LOGIN ROUTE
// ===========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Check password using your custom method
    // Your User.js has a method called 'comparePassword' - let's use it!
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, username: user.username, email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
