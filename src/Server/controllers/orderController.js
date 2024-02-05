const Order = require("../models/orderModel");
const Users = require("../models/UserAuth");
const mongoose = require("mongoose");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { title, image } = req.body;
    const order = new Order({ title, image });
    await order.save();
    res.status(201).send("Order placed successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    console.log("Deleting order with ID:", orderId);

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).send("Invalid Order ID");
    }

    const order = await Order.findById(orderId).lean();
    console.log("Found order:", order);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    await Order.deleteOne({ _id: orderId });

    res.status(200).send("Order deleted successfully!");
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Internal Server Error");
  }
};
