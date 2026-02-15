const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

const user_signup = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) {
      console.log(`⚠️ Signup failed: User ${req.body.email} already exists`);
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    let cart = {};
    for (let i = 0; i <= 300; i++) cart[i] = 0;

    const newUser = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await newUser.save();
    
    const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET);
    
    // ✅ Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ success: true, name: newUser.name });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const user_login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log(`⚠️ Login failed: User ${req.body.email} not found`);
      return res.json({ success: false, error: "Invalid email" });
    }

    const match = req.body.password === user.password;
    if (!match) {
      console.log(`⚠️ Login failed: Wrong password for ${req.body.email}`);
      return res.json({ success: false, error: "Wrong password" });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    
    // ✅ Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ success: true, name: user.name });
  } catch (error) {
    console.error("❌ Login system error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: "Logged out" });
};

const check_auth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_cart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.cartData || {});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const add_to_cart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.cartData) user.cartData = {};
    user.cartData[req.body.itemId] = (user.cartData[req.body.itemId] || 0) + 1;
    user.markModified("cartData");
    await user.save();
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const remove_from_cart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.cartData[req.body.itemId] > 0) {
      user.cartData[req.body.itemId] -= 1;
      user.markModified("cartData");
      await user.save();
    }
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  user_signup,
  user_login,
  logout,
  check_auth,
  get_cart,
  add_to_cart,
  remove_from_cart
};
