const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Order = require("../models/orderModel");
const User = require("../models/UserAuth");
const mongoose = require("mongoose");
require("dotenv").config();

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phoneNumber, work, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneNumber,
      work,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("User registered:", savedUser);

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  console.log("Received login request with body:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password. Password provided:", password);
      console.log("Hashed password from database:", user.password);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Login successful. Generated token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { title, image } = req.body;
    const order = new Order({ title, image });
    await order.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
