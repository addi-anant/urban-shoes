const crypto = require("crypto");
const razorpayInstance = require("../utils/razorpayInstance");
const Order = require("../models/Order");

module.exports.getKey = (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

module.exports.pay = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  /* Create an Order: */
  const order = await razorpayInstance.orders.create(options);
  return res.status(200).json(order);
};

module.exports.verification = async (req, res) => {
  const {
    userId,
    orderDetail,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  /* Payment Verification: */
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic =
    expectedSignature === razorpay_signature; /* Payment Successful. */

  if (isAuthentic) {
    /* Payment Done => Save Information in Database */
    const orderList = orderDetail.map((order) => {
      return {
        userId: userId,
        product: order[0],
        colour: order[1],
        size: order[2],
        quantity: order[3],
        razorpayOrderID: razorpay_order_id,
        razorpayPaymentID: razorpay_payment_id,
      };
    });

    await Order.insertMany(orderList);
    return res.status(200).send();
  } else {
    res.status(400).send();
  }
};
