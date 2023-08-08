const Product = require("../models/Product");

module.exports.get_product = async (req, res) => {
  try {
    const productList = await Product.find({});
    return res.status(200).json(productList);
  } catch (Err) {
    console.log(`Error while fetching product: ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.get_individual_product = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (Err) {
    console.log(`Error while fetching individual product: ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.add_product = async (req, res) => {
  if (req.payload.admin) {
    const product = new Product({
      ...req.body,
    });

    try {
      await product.save();
      return res.status(200).json("Product added successfully!");
    } catch (Err) {
      console.log(`Error adding product: ${Err}`);
      return res.status(500).json(Err);
    }
  }

  return res.status(400).send("You are not allowed to add product!");
};
