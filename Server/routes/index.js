const router = require("express").Router();

// auth route:
router.use("/auth", require("./auth"));

// product route:
router.use("/product", require("./product"));

// payment route:
router.use("/payment", require("./payment"));

module.exports = router;
