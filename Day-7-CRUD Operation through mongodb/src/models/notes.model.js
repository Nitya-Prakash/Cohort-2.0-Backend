const mongoose = require("mongoose");

const noteSchema = new mongoose.mongoose.Schema({
  title: String,
  description: String,
  likes: Number,
});

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
