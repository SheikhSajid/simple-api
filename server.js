const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const itemRouter = require("./resources/item");
const orderRouter = require("./resources/order");
const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/items?", itemRouter);
app.use("/orders?", orderRouter);

app.listen(8080, () => {
  console.log("listening on 8080");
});
