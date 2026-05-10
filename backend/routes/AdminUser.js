const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router()

// Get User
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})

// Create User
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'customer'
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user })
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Update User
router.put("/:id", protect, admin, async (req, res) => {
  const { name, email, role } = req.body
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.name = name;
    user.email = email;
    user.role = role;

    await user.save()
    res.json({
      message: "User updated successfully",
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Delete User
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    await user.deleteOne()
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})
module.exports = router;