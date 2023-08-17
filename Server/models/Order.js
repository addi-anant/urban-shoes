const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  razorpayOrderID: {
    type: String,
    required: true,
  },
  razorpayPaymentID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
