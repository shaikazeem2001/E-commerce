const express = require('express');
const router = express.Router();
const { user_signup, user_login, logout, check_auth, get_cart, add_to_cart, remove_from_cart } = require('../controllers/users.controllers');
const fetchuser = require('../middleware/auth.middleware');

router.post('/signup', user_signup);
router.post('/login', user_login);
router.post('/logout', logout);
router.get('/check-auth', fetchuser, check_auth);
router.post('/getcart', fetchuser, get_cart);
router.post('/addtocart', fetchuser, add_to_cart);
router.post('/removefromcart', fetchuser, remove_from_cart);

module.exports = router;
