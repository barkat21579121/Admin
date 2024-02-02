const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/myDB");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Order = mongoose.model("Order", {
  title: String,
  image: String,
});

// Endpoint to fetch all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { title, image } = req.body;
    const order = new Order({ title, image });
    await order.save();
    res.status(201).send("Order placed successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
