const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouters = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoute = require("./routes/CartRoutes");
const checkoutRouter = require("./routes/CheckoutRouter");
const orderRouter = require("./routes/OrderRouter");
const uploadRouter = require("./routes/UploadRouter");
const AdminUser = require("./routes/AdminUser");
const AdminProduct = require("./routes/AdminProduct");
const AdminOrder = require("./routes/AdminOrder");
const paypalRoutes = require("./routes/paypalRoutes");
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO THUY API");
});

// API Routes
app.use("/api/users", userRouters);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/upload", uploadRouter);

//Admin
app.use("/api/admin/users", AdminUser);
app.use("/api/admin/products", AdminProduct);
app.use("/api/admin/orders", AdminOrder);

// PayPal
app.use("/api/payments/paypal", paypalRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
