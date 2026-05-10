const express = require("express");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get order for userId
router.get("/my-order", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Get order with id
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
