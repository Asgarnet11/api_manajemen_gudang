const express = require("express");
const controller = require("../controllers/item.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);
router.route("/").post(controller.createItem).get(controller.getAllItems);
router.patch("/:id/status", controller.updateItemStatus);

module.exports = router;
