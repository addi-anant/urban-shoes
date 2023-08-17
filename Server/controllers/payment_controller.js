const crypto = require("crypto");
const razorpayInstance = require("../utils/razorpayInstance");

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

module.exports.verification = (req, res) => {
  const {
    product,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  console.log(product);

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
    return res.status(200).send();
  } else {
    res.status(400).send();
  }
};
