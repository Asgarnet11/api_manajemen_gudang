const express = require("express");
const controller = require("../controllers/report.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/items",
  authenticate,
  authorize(["admin"]),
  controller.getItemReport
);

module.exports = router;
