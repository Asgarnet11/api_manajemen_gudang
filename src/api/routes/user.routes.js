const express = require("express");
const { getMyProfile } = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticate, getMyProfile);

router.get("/admin-only", authenticate, authorize(["admin"]), (req, res) => {
  res.status(200).json({ message: "Selamat datang, Admin!" });
});

module.exports = router;
