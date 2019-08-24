const express = require("express");

const itemsRouter = express.Router();

itemsRouter.get("/", (req, res) => {
  res.send({
    success: true,
    items: [
      {
        id: "sadkjhadhjkashdj",
        type: "sdad",
        color: "grey",
        size: "L",
        stock: 3
      }
    ]
  });
});

itemsRouter.get("/:id", (req, res) => {
  res.send({ success: true, item: { name: "asdasd", id: req.params.id } });
});

// admin
itemsRouter.post("/", (req, res) => {
  const { items } = req.body; // array

  res.send({ success: true, itemIds: ["sdad", "sadf"] });
});

itemsRouter.patch("/:id", (req, res) => {
  const { body, headers } = req; // array
  res.send({ success: true, id: req.params.id });
});

itemsRouter.delete("/:id", (req, res) => {
  res.send({ success: true });
});

module.exports = itemsRouter;
