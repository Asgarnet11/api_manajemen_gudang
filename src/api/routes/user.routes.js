const express = require("express");
const { getMyProfile } = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Route ini dilindungi. Hanya user yang sudah login yang bisa mengakses.
router.get("/profile", authenticate, getMyProfile);

// Route ini hanya untuk admin.
router.get("/admin-only", authenticate, authorize(["admin"]), (req, res) => {
  res.status(200).json({ message: "Selamat datang, Admin!" });
});

module.exports = router;
