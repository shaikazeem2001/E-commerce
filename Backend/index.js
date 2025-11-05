const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://shaikazeem:shaikazeem007@cluster0.afk8wdq.mongodb.net/Ecommerce")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Start server
app.listen(port, (error) => {
  if (!error) console.log(`🚀 Server running on port ${port}`);
  else console.log("Error: " + error);
});

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
app.use("/images", express.static("upload/images"));

// ✅ Upload route
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
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
  const token = jwt.sign({ user: { id: newUser._id } }, "secret_ecom");
  res.json({ success: true, token });
});

// ✅ Login
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, error: "Invalid email" });

  const match = req.body.password === user.password;
  if (!match) return res.json({ success: false, error: "Wrong password" });

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
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
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ✅ Cart APIs
app.post("/addtocart", fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.cartData) user.cartData = {};
  user.cartData[req.body.itemId] = (user.cartData[req.body.itemId] || 0) + 1;
  await user.save();
  res.json({ success: true, message: "Item added to cart" });
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
