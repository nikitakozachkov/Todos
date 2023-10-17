const express = require("express");

const auth = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/signup", auth.signup);

router.get("/verify/:verificationToken", auth.verifyEmail);

router.post("/verify", auth.resendVerifyEmail);

router.post("/login", auth.login);

router.get("/current", authenticate, auth.current);

router.post("/logout", authenticate, auth.logout);

module.exports = router;
