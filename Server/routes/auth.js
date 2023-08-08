const router = require("express").Router();
const auth = require("../controllers/auth_controller");
const { verifyToken } = require("../JWT/JWT_auth");

// Login:
router.post("/login", auth.login);

// Register:
router.post("/register", auth.register);

// Google:
router.post("/google", auth.google);

// Logout:
// router.get("/logout", auth.logout);
router.get("/logout", verifyToken, auth.logout);

module.exports = router;
