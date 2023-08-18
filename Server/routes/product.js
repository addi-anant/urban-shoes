const router = require("express").Router();
const { verifyToken } = require("../JWT/JWT_auth");
const product = require("../controllers/product_controller");

router.get("/", product.get_product);

router.get("/iconic", product.iconic);

router.get("/trending", product.trending);

router.get("/:id", product.get_individual_product);

router.post("/add", verifyToken, product.add_product);

router.post("/search/:query/:index", product.search_product);

module.exports = router;
