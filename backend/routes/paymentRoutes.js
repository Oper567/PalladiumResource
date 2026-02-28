const express = require('express');
const router = express.Router();
const { verifyPayment } = require('../controllers/paymentController');

// This matches the POST request from your React frontend
router.post('/verify', verifyPayment);

module.exports = router;