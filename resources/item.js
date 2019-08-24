const express = require("express");
const { verifyItemShape } = require("../misc");

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
function verifyToken(req, next) {
  const TOKEN =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjI1NzI0NjQsImV4cCI6MTU5NDEwODQ2OSwiYXVkIjoid3d3LnN0dWRlbnRzLjJoYXRzLmNvbS5hdSIsInN1YiI6InVzZXJAMmhhdHMuY29tLmF1IiwiR2l2ZW5OYW1lIjoiSm9obiIsIlN1cm5hbWUiOiJTbm93IiwiRW1haWwiOiJqb2huc25vd0AyaGF0cy5jb20uYXUiLCJSb2xlIjoiSmFuaXRvciJ9.BEEqb2ihfP0ec8TBu91T9lk0kcBKpz1NkJv4PpyjxdE";

  if (req.headers.authorization !== TOKEN) next(Error("Unauthorized"));
}

itemsRouter.post("/", (req, res, next) => {
  verifyToken(req, next);
  const { items } = req.body; // array
  if (!items || !Array.isArray(items) || items.length === 0) {
    next(Error("Invalid request"));
  }

  items.forEach(item => {
    if (!verifyItemShape(item)) next(Error("One (or more) items are invalid"));
  });

  res.send({ success: true, itemIds: ["1"] });
});

itemsRouter.patch("/:id", (req, res, next) => {
  verifyToken(req, next);

  res.send({ success: true, id: req.params.id });
});

itemsRouter.delete("/:id", (req, res, next) => {
  verifyToken(req, next);
  res.send({ success: true });
});

itemsRouter.use((err, req, res, next) => {
  console.log("sending error");
  res.status(401).send({ success: false, message: err.message });
});

module.exports = itemsRouter;
