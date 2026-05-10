const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router()

// Get Product
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
})

// Update Product
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name ?? product.name;
    product.description =
      req.body.description ?? product.description;

    product.price = req.body.price ?? product.price;

    product.countInStock =
      req.body.countInStock ?? product.countInStock;

    product.category =
      req.body.category ?? product.category;

    product.sku = req.body.sku ?? product.sku;

    product.brand = req.body.brand ?? product.brand;

    product.size = req.body.size ?? product.size;

    product.colors = req.body.colors ?? product.colors;

    product.collections =
      req.body.collections ?? product.collections;

    product.material =
      req.body.material ?? product.material;

    product.gender =
      req.body.gender ?? product.gender;

    product.images =
      req.body.images ?? product.images;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
module.exports = router

