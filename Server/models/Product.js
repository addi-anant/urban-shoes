const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: [String],
    required: true,
  },
  tag: {
    type: [String],
    required: true,
  },
  sizeAvailable: {
    type: [String],
    required: true,
  },
  colourAvailable: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
