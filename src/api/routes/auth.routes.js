const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

const router = express.Router();

// auth route
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
