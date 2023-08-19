const router = require("express").Router();
const auth = require("../controllers/auth_controller");
const { verifyToken } = require("../JWT/JWT_auth");

// Login:
router.post("/login", auth.login);

// Register:
router.post("/register", auth.register);

// Logout:
router.post("/logout", auth.logout);

module.exports = router;
