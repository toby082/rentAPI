const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: "Username already taken" });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    fullName,
    email,
    username,
    password: hashedPassword,
  });

  // Save to the database
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Profile Route 
router.get("/my-profile", require("../middleware/authMiddleware"), async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;