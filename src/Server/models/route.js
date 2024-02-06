// routes.js
const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  deleteOrder,
  UserData,
} = require("../controllers/orderController");

router.post("/registration", UserData);
router.get("/orders", getAllOrders);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
