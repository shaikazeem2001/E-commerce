require('dotenv').config(); // ✅ load .env variables
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;        // ✅ server port
const MONGO_URI = process.env.MONGODB_URI;    // ✅ MongoDB URI
const JWT_SECRET = process.env.JWT_SECRET;    // ✅ JWT secret

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
  console.log(`\n🔍 Incoming Request: ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// ✅ MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: path.join(__dirname, "upload/images"), // absolute path
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ✅ Serve static images
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// ✅ Upload route (dynamic URL)
app.post("/upload", upload.single("image"), (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host"); // dynamic host
  res.json({
    success: true,
    image_url: `${fullUrl}/images/${req.file.filename}`,
  });
});

// ✅ Schemas
const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

// ✅ Signup
app.post("/signup", async (req, res) => {
  const check = await User.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false, error: "User already exists" });

  let cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;

  const newUser = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await newUser.save();
  const token = jwt.sign({ user: { id: newUser._id } }, JWT_SECRET);
  res.json({ success: true, token });
});

// ✅ Login
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, error: "Invalid email" });

  const match = req.body.password === user.password;
  if (!match) return res.json({ success: false, error: "Wrong password" });

  const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
  res.json({ success: true, token });
});

// ✅ Add product
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, message: "Product added", data: product });
});

// ✅ Remove product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, message: "Product removed" });
});

// ✅ Fetch collections
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.json(products.slice(0, 4));
});

// ✅ Middleware
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "No token, access denied" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ✅ Cart APIs
app.post("/addtocart", fetchuser, async (req, res) => {
  try {
    console.log("\n=== ADD TO CART REQUEST ===");
    console.log("📦 Item ID:", req.body.itemId);
    console.log("👤 User ID:", req.user.id);
    console.log("📝 Full request body:", req.body);
    
    const user = await User.findById(req.user.id);
    if (!user.cartData) user.cartData = {};
    user.cartData[req.body.itemId] = (user.cartData[req.body.itemId] || 0) + 1;
    user.markModified("cartData");
    await user.save();
    
    console.log("✅ Cart updated successfully");
    const nonZeroItems = Object.entries(user.cartData).filter(([id, qty]) => qty > 0);
    console.log("🛒 Non-zero cart items:", nonZeroItems)
    console.log("===========================\n");
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("❌ Error in addtocart:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
  await user.save();
  res.json({ success: true, message: "Item removed from cart" });
});

app.post("/getcart", fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData || {});
});

// ✅ All products
app.get("/allproducts", async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
});

// ✅ Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
