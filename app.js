const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route.js");
const brandRoute = require("./routes/brand.route.js");

// schema design

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// POSTING TO DATABASE

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

module.exports = app;
