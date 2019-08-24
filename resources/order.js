const express = require("express");

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
  res.send({
    success: true,
    items: [
      {
        id: "kjghfhkdgk445",
        itemId: "sadkjhadhjkashdj",
        quantity: 2
      }
    ]
  });
});

ordersRouter.get("/:id", (req, res) => {
  res.send({ success: true, order: {} });
});

ordersRouter.post("/", (req, res) => {
  res.send({ success: true, order: {} });
});

module.exports = ordersRouter;
