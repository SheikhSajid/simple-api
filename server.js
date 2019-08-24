const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8080, () => {
  console.log("listening on 8080");
});
