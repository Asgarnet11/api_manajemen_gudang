const express = require("express");
const controller = require("../controllers/customer.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .post(controller.createCustomer)
  .get(controller.getAllCustomers);

router
  .route("/:id")
  .get(controller.getCustomerById)
  .put(controller.updateCustomer)
  .delete(controller.deleteCustomer);

module.exports = router;
