const express = require("express");

const app = express(); // server instance create kana

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("This is about page.");
});

app.listen(3000); // server start karna
