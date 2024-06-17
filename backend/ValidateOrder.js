const crypto = require('crypto');
const OrderDetail = require('./Models/booking.model');

async function ValidateOrder(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Create HMAC SHA-256 with RAZORPAY_KEY_SECRET
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  // Check if the computed digest matches the provided signature
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  try {
    // Update order details in the database
    const updatedOrder = await OrderDetail.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        paymentStatus: 'completed',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      },
      { new: true }
    );

    // If order not found, return 404 status
    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // If order updated successfully, return success message with order ID and payment ID
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Error updating order details:", err);
    res.status(500).json({ error: "Failed to update order details" });
  }
}

module.exports = { ValidateOrder };
