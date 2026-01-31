const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    notes,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully !",
    notes,
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, {
    description,
  });

  res.status(200).json({
    message: "Note Updated Successfullly !",
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully !",
  });
});

module.exports = app;
