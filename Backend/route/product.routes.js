const express = require('express');
const router = express.Router();
const { add_product, remove_product, get_all_products, get_new_collections, get_popular_in_women } = require('../controllers/product.controllers');

router.post('/addproduct', add_product);
router.post('/removeproduct', remove_product);
router.get('/allproducts', get_all_products);
router.get('/newcollections', get_new_collections);
router.get('/popularinwomen', get_popular_in_women);

module.exports = router;
