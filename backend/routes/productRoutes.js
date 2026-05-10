const express = require("express");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const handleServerError = (res, error, context) => {
  console.error(`[ProductRoutes] ${context}:`, error);
  return res.status(500).json({ message: "Server error" });
};
// Add new product
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      sku,
      dismensions,
      weight,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      sku,
      dismensions,
      weight,
      user: req.user._id, // Reference to the admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    return handleServerError(res, error, "Create product");
  }
});

// Update product
router.put("/:id", protect, admin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      sku,
      dismensions,
      weight,
    } = req.body;

    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.countInStock = countInStock ?? product.countInStock;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.size = size ?? product.size;
    product.colors = colors ?? product.colors;
    product.collections = collections ?? product.collections;
    product.material = material ?? product.material;
    product.gender = gender ?? product.gender;
    product.images = images ?? product.images;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished =
      isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags ?? product.tags;
    product.sku = sku ?? product.sku;
    product.dismensions = dismensions ?? product.dismensions;
    product.weight = weight ?? product.weight;

    // Save the updated product
    const updateProduct = await product.save();
    return res.json(updateProduct);
  } catch (error) {
    return handleServerError(res, error, "Update product");
  }
});

// Delete product
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      return res.status(200).json({ message: "Product removed" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return handleServerError(res, error, "Delete product");
  }
});

// Get the product with filter bar
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLowerCase() !== "all")
      query.collections = collection;
    if (category && category.toLowerCase() !== "all") query.category = category;
    if (material) query.material = { $in: material.split(",") };
    if (color) query.colors = { $in: color.split(",") };
    if (size) query.size = { $in: size.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (gender) query.gender = gender;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //  Sử dụng Mongoose Query
    let productQuery = Product.find(query);
    if (Object.keys(sort).length) productQuery = productQuery.sort(sort);
    if (limit) productQuery = productQuery.limit(Number(limit));
    const products = await productQuery;
    return res.status(200).json(products);
  } catch (error) {
    return handleServerError(res, error, "Get products list");
  }
});

// Get best seller Product
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      return res.status(200).json(bestSeller);
    } else {
      return res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    return handleServerError(res, error, "Get best seller");
  }
});

// Get new arrivals product
router.get("/new-arrivals", async (req, res) => {
  try {
    // Fetch latest 8 products
    const newArrivals = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(8);
    return res.status(200).json(newArrivals);
  } catch (error) {
    return handleServerError(res, error, "Get new arrivals");
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return handleServerError(res, error, "Get product by id");
  }
});

// Get similar product by id
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    return res.status(200).json(similarProducts);
  } catch (error) {
    return handleServerError(res, error, "Get similar products");
  }
});
module.exports = router;
