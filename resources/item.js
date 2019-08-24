const express = require("express");
const { verifyItemShape } = require("../misc");
const db = require("../firestore");

const itemsRouter = express.Router();

const itemsColl = db.collection("items");

itemsRouter.get("/", (req, res, next) => {
  itemsColl.get().then(snap => {
    const items = [];

    snap.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    res.send({ success: true, items });
  });
  //   res.send({
  //     success: true,
  //     items: [
  //       {
  //         id: "sadkjhadhjkashdj",
  //         type: "sdad",
  //         color: "grey",
  //         size: "L",
  //         stock: 3
  //       }
  //     ]
  //   });
});

itemsRouter.get("/:id", (req, res, next) => {
  itemsColl
    .doc(req.params.id)
    .get(doc => {
      if (doc.exists)
        res.send({ success: true, item: { id: doc.id, ...doc.data() } });
      else res.send({ success: false, message: "Order could not be found" });
    })
    .catch(err => next(err));
});

// admin
function verifyToken(req, next) {
  const TOKEN =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjI1NzI0NjQsImV4cCI6MTU5NDEwODQ2OSwiYXVkIjoid3d3LnN0dWRlbnRzLjJoYXRzLmNvbS5hdSIsInN1YiI6InVzZXJAMmhhdHMuY29tLmF1IiwiR2l2ZW5OYW1lIjoiSm9obiIsIlN1cm5hbWUiOiJTbm93IiwiRW1haWwiOiJqb2huc25vd0AyaGF0cy5jb20uYXUiLCJSb2xlIjoiSmFuaXRvciJ9.BEEqb2ihfP0ec8TBu91T9lk0kcBKpz1NkJv4PpyjxdE";

  if (req.headers.authorization !== TOKEN) return false;

  return true;
}

itemsRouter.post("/", (req, res, next) => {
  if (!verifyToken(req, next)) {
    next(Error("Unauthorized"));
    return;
  }

  const { items } = req.body; // array
  let itemValid = true;
  const itemIds = [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    next(Error("Invalid request"));
    return;
  }

  items.forEach(item => {
    if (!verifyItemShape(item)) {
      next(Error("One (or more) items are invalid"));
      itemValid = false;
    }
  });

  if (itemValid) {
    const addPromises = [];

    items.forEach(item => {
      addPromises.push(itemsColl.add(item));
    });

    Promise.all(addPromises)
      .then(refs => {
        refs.forEach(ref => itemIds.push(ref.id));
        res.send({ success: true, itemIds });
      })
      .catch(err => next(err));
  }

  console.log("here!");
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
  res.status(401).send({ success: false, message: err.message });
});

module.exports = itemsRouter;
