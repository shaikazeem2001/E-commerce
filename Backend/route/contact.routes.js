const express = require('express');
const router = express.Router();
const {  contact_submission } = require('../controllers/contact.controllers');

router.post('/contact', contact_submission);

module.exports = {router};
