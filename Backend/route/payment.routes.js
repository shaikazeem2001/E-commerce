const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/payment.controllers');

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
