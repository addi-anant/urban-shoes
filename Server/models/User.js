const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Cart",
  },
});

module.exports = mongoose.model("User", UserSchema);
