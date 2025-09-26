const express = require("express");
const controller = require("../controllers/invoice.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
router.use(authenticate);

router
  .route("/")
  .post(authorize(["admin"]), controller.create)
  .get(controller.getAll);

module.exports = router;
