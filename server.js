const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const itemRouter = require("./resources/item");
const orderRouter = require("./resources/order");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.status(400).send({ success: false, message: "Invalid URI" });
});

app.use("/items?", itemRouter);
app.use("/orders?", orderRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
