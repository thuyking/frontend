const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get Orders
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({});

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update Order
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status =
      req.body.status ?? order.status;

    order.isDelivered =
      req.body.isDelivered ?? order.isDelivered;

    if (req.body.isDelivered) {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);// ko có respone dễ bị treo api 
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete Order
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;