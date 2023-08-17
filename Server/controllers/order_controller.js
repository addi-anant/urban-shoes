const Order = require("../models/Order");

module.exports.orderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderList = await Order.find({ userId: id }).populate("product");
    return res.status(200).json(orderList);
  } catch (Error) {
    console.log(`Error while fetching order: ${Error}`);
    return res.status(500).json(Error);
  }
};
