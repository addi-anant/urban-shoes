const router = require("express").Router();

// auth route:
router.use("/auth", require("./auth"));

// product route:
router.use("/product", require("./product"));

module.exports = router;
