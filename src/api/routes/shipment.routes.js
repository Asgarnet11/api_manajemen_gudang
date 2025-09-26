const express = require("express");
const controller = require("../controllers/shipment.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
router.use(authenticate);

router
  .route("/")
  .post(authorize(["admin"]), controller.create)
  .get(controller.getAll);
router.get("/available-items", controller.getAvailableItems);
router.route("/:id").get(controller.getById);
router.post("/:id/add-items", authorize(["admin"]), controller.addItems);

module.exports = router;
