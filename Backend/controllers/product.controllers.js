const Product = require('../models/product.model');
const cloudinary = require('cloudinary').v2;

const add_product = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const remove_product = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_all_products = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_new_collections = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products.slice(-8));
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_popular_in_women = async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    res.json(products.slice(0, 4));
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  add_product,
  remove_product,
  get_all_products,
  get_new_collections,
  get_popular_in_women
};
