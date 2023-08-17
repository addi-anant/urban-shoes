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
      return res.status(200).json(product?._id);
    } catch (Err) {
      console.log(`Error adding product: ${Err}`);
      return res.status(500).json(Err);
    }
  }

  return res.status(400).send("You are not allowed to add product!");
};

module.exports.search_product = async (req, res) => {
  const { query } = req.params;
  const { brand, gender, type, colour, size, cost } = req.body;

  let filter = {};
  if (type.length) filter = { ...filter, type: { $in: type } };
  if (cost) filter = { ...filter, cost: { $lte: Number(cost) } };
  if (brand.length) filter = { ...filter, brand: brand };
  if (gender.length) filter = { ...filter, gender: { $in: gender } };
  if (size.length) filter = { ...filter, sizeAvailable: { $in: size } };
  if (colour.length) filter = { ...filter, colourAvailable: { $in: colour } };

  /* All Product Query: */
  if (query === "All") {
    const allProduct = await Product.find(filter);
    return res.status(200).json(allProduct);
  }

  /* Men Product Query: */
  /* Kids Product Query: */
  /* Women Product Query: */

  /* General Query: */
  filter = { ...filter, $text: { $search: `${query}` } };

  const queryOutput = await Product.find(filter);
  return res.status(200).json(queryOutput);
};
