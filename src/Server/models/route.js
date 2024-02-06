const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  deleteOrder,
  registerUser,
  loginUser,
} = require("../controllers/orderController");

router.get("/orders", getAllOrders);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
