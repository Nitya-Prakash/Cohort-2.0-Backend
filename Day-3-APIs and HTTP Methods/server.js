// APIs and HTTP Methods
const express = require("express");

const app = express();

app.use(express.json()); // Without this express can not read the values. So if you want to accesst those values then you have to use this, so that you can see them. It is also called a middleware.

const notes = [];

// create
app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);

  res.send("Note Created");
});

// read
app.get("/notes", (req, res) => {
  res.send(notes);
});

// delete
app.delete("/notes", (req, res) => {
  notes.length = 0;
  res.send("Notes deletd !!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
