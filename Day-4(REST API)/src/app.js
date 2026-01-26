// Server create karna and server config karna mainly ham app.js file mein hi kar rahe honge.

const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("Note created !");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("Note Updated Successfully !");
});

// /notes/:index -> /notes/2
// ":index" ye value dynamic hai issilye isko ":" ke saath likha jaata hai
app.delete("/notes/:index", (req, res) => {
  // console.log(req.params);
  // console.log(req.params.index);
  delete notes[req.params.index];

  res.send("Note deleted successfully!");
});

module.exports = app;
