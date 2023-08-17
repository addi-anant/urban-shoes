const router = require("express").Router();
const { verifyToken } = require("../JWT/JWT_auth");
const payment = require("../controllers/payment_controller");

router.post("/", verifyToken, payment.pay);

router.get("/key", verifyToken, payment.getKey);

router.post("/verify", verifyToken, payment.verification);

module.exports = router;
