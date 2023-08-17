const router = require("express").Router();
const { verifyToken } = require("../JWT/JWT_auth");
const order = require("../controllers/order_controller");

/* Order based upon id: */
router.get("/:id", verifyToken, order.orderById);

module.exports = router;
