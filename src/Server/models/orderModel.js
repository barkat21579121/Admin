
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    title: String,
    image: String,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
