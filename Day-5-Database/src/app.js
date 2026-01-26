const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  // res.send("Note Created !");
  res.status(201).json({
    message: "Note created Successfully",
  }); // Like this you have to send messages with status code. 201 status code is used for a successful "POST" request.
});

app.get("/notes", (req, res) => {
  // res.send(notes);
  res.status(200).json({
    notes: notes,
  }); // 200 status code is used for a successful "GET" request.
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].content = req.body.content;

  res.status(200).json({
    message: "Note updated successfully !",
  });
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(204).json({
    message: "Note deleted successfully !",
  }); // 204 status code is used for "DELETE" request when the resource is removed successfully. But there is one thing, you can not see any of the message that you've sent.
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
