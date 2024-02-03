const Order = require("../models/orderModel");
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

        console.log("Deleting order with ID:", orderId); // Log orderId for debugging

        // Check if the orderId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send("Invalid Order ID");
        }

        // Find the order by its ID and use .lean() to return plain JavaScript objects
        const order = await Order.findById(orderId).lean();
        console.log("Found order:", order); // Log order for debugging

        // If the order doesn't exist, return a 404 Not Found response
        if (!order) {
            return res.status(404).send("Order not found");
        }

        // Delete the order
        await Order.deleteOne({ _id: orderId });

        // Send a 200 OK response indicating successful deletion
        res.status(200).send("Order deleted successfully!");
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting order:", error);
        res.status(500).send("Internal Server Error");
    }
};
