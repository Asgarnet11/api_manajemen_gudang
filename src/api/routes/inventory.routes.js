const express = require("express");
const controller = require("../controllers/inventory.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);

router.post("/in", controller.createStockIn);
router.get("/:itemId/history", controller.getItemHistory);
router.get("/low-stock", controller.getLowStock);
router.get("/dashboard-analytics", controller.getAnalytics);

module.exports = router;
