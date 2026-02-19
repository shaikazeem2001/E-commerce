const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    console.log(`📡 Attempting to connect to: ${MONGO_URI.substring(0, 20)}...`);
    
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("💡 Tip: Make sure your local MongoDB service is running or check your .env file.");
  }
};

module.exports = connectDB;
