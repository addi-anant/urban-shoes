const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { generateAccessToken } = require("../JWT/JWT_auth");
const Cart = require("../models/Cart");

// Login:
module.exports.login = async (req, res) => {
  const credentials = req.body;
  const user = await User.findOne({ email: credentials.email })
    .populate({
      path: "wishlist",
    })
    .populate({
      path: "cart",
      populate: {
        path: "productList.productInfo",
      },
    });

  /* No matching user found: */
  if (!user)
    return res.status(401).send("Invalid Username/Password, Try Again!");

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASSWORD_SECRET
  );

  const Password = hashedPassword.toString(CryptoJS.enc.Utf8);

  /* Invalid Password: */
  if (Password != credentials.password)
    return res.status(401).send("Invalid Username/Password, Try Again!");

  /* Matching user found: -> Generate Access Token: */
  const accessToken = generateAccessToken(user);

  /* Don't send password along with user detials: */
  const { password, ...userInfo } = user._doc;

  /* Return the required data */
  return res
    .cookie("accessToken", accessToken, {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send(userInfo);
};

// Register:
module.exports.register = async (req, res) => {
  const credentials = req.body;

  const cart = new Cart();
  try {
    await cart.save();
  } catch (Error) {
    console.log(`Error creating cart: ${Error}`);
    return res.status(500).json(Error);
  }

  const user_created = new User({
    ...credentials,
    cart: cart._id,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    await user_created.save();
    return res.status(200).send("user created successfully.");
  } catch (Error) {
    console.log(`Error creating user: ${Error}`);
    return res.status(500).json(Error);
  }
};

// Logout:
module.exports.logout = async (req, res) => {
  const { id, cartProductId, wishlistProductId, cartSummary } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      $set: { wishlist: wishlistProductId, cartSummary },
    });

    const user = await User.findById(id);
    await Cart.findByIdAndUpdate(user?.cart, {
      $set: { productList: cartProductId },
    });

    return res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("You logged out successfully.");
  } catch (Error) {
    console.log(`Error while updating user during logout: ${Error}`);
    return res.status(500).json(Error);
  }
};
