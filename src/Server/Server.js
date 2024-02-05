const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./route");

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());
app.use("/api", routes);
// const DB = `mongodb+srv://barkatullahkhan120136:123@cluster0.iplfqvu.mongodb.net/Mern`
mongoose.connect("mongodb://localhost:27017/myDB");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
