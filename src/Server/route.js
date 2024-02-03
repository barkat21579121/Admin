// routes.js
const express = require("express");
const router = express.Router();
const { getAllOrders, createOrder, deleteOrder } = require("./controllers/orderController");

router.get("/orders", getAllOrders);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);



module.exports = router;
