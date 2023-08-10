const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productList: [
    {
      productInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      selectedQuantity: {
        type: Number,
        required: true,
      },
      selectedSize: {
        type: Number,
        required: true,
      },
      selectedColour: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
