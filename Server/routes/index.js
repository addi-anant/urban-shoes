const router = require("express").Router();

// auth route:
router.use("/auth", require("./auth"));

// product route:
router.use("/product", require("./product"));

// payment route:
router.use("/payment", require("./payment"));

// order route:
router.use("/order", require("./order"));

module.exports = router;
