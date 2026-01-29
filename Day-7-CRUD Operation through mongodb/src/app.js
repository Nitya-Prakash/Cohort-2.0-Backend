const express = require("express");
const noteModel = require("./models/notes.model.js");

const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description, likes } = req.body;

  const note = await noteModel.create({
    title,
    description,
    likes,
  });

  res.status(201).json({
    message: "Note created successfully !",
    note,
  });
});

module.exports = app;
