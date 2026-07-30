const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public")); // Iss line mein express hamara public folder mein jo jo bhi files hain unko publically available kar de raha hai, so job koi api, js or css file ko access karna chahega tab wo access kar sakta hai. Issiliye ham ab ek hi url mein dono frontend and backend ko access kar sakte hai, ab hamein dono folder ko different different run karna nahi padega.

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

// console.log(__dirname);

app.use("*name", (req, res) => {
  // res.sendFile("../public/index.html");
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
  // res.send("This is wild card");
}); // If user throw a requet on an invalid api, then it will handle in this middleware

module.exports = app;
