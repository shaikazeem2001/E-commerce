require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const compression = require('compression');
const path = require("path");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./route/user.routes');
const productRoutes = require('./route/product.routes');
const { router: contactRoutes } = require('./route/contact.routes');
const paymentRoutes = require('./route/payment.routes');

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect Database
connectDB();

// ✅ Logging Middleware (Move to top for more visibility)
app.use((req, res, next) => {

  next();
});

// ✅ Middleware
app.use(compression());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://e-commerce2-rust.vercel.app"
    ];
    if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost:")) {
      callback(null, true);
    } else {
      console.log(`❌ CORS Blocked Origin: ${origin}`);
      callback(new Error("CORS not allowed check index.js"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Multer setup (temporary local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "upload"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ✅ Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("📤 Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
      resource_type: "auto"
    });
    console.log("✅ Cloudinary URL:", result.secure_url);
    res.json({
      success: true,
      image_url: result.secure_url
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Modular Routes
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/', contactRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));