const axios = require('axios');
const { db } = require('../config/db');

// @desc    Verify Flutterwave Transaction
// @route   POST /api/payments/verify
exports.verifyPayment = async (req, res) => {
  const { transaction_id, expectedAmount, uid, orderItems } = req.body;

  try {
    // 1. Call Flutterwave API to verify the transaction
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const { status, currency, amount, id } = response.data.data;

    // 2. Validate the data (Security Check)
    if (
      status === "successful" &&
      amount >= expectedAmount &&
      currency === "NGN"
    ) {
      // 3. Save Order to Firestore
      const newOrder = {
        userId: uid,
        transactionId: id,
        amount: amount,
        items: orderItems,
        status: 'Paid',
        paidAt: new Date().toISOString(),
      };

      const docRef = await db.collection('orders').add(newOrder);

      res.status(200).json({
        success: true,
        message: "Payment verified and order saved",
        orderId: docRef.id
      });
    } else {
      res.status(400).json({ success: false, message: "Transaction validation failed" });
    }
  } catch (error) {
    console.error("Flutterwave Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Verification Server Error" });
  }
};