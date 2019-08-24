const express = require("express");
const db = require("../firestore");

const ordersRouter = express.Router();

const ordersColl = db.collection("orders");

ordersRouter.get("/", (req, res) => {
  ordersColl.get().then(snap => {
    const orders = [];

    snap.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    res.send({ success: true, orders });
  });
});

ordersRouter.get("/:id", (req, res, next) => {
  ordersColl
    .doc(req.params.id)
    .get()
    .then(doc => {
      if (doc.exists)
        res.send({ success: true, order: { id: doc.id, ...doc.data() } });
      else res.send({ success: false, message: "Order could not be found" });
    })
    .catch(err => next(err));
});

ordersRouter.post("/", (req, res, next) => {
  const { itemId, quantity } = req.body;
  const itemRef = db.collection("items").doc(itemId);

  if (isNaN(Number(quantity)) || !itemId) {
    next(Error("Invalid request"));
    return;
  }

  db.runTransaction(t => {
    return t.get(itemRef).then(doc => {
      if (doc.exists) {
        const stock = doc.data().stock;

        if (quantity > stock) next(Error("Item does not have enough stock"));
        else {
          t.set(ordersColl.doc(), { itemId, quantity });
          t.update(itemRef, { stock: stock - quantity });
        }
      } else {
        next(Error("Item could not be found"));
      }
    });
  })
    .then(() => res.send({ success: true, order: { itemId, quantity } }))
    .catch(err => next(err));
});

ordersRouter.use((err, req, res, next) => {
  res.status(500).send({ success: false, message: err.message });
});

module.exports = ordersRouter;
