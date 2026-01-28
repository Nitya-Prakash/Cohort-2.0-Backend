const app = require("./src/app.js");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://prakashnitya07_db_user:F4k2qkrZIL03J@cluster0.1tuewkm.mongodb.net/Day-6",
    )
    .then(() => {
      console.log("Connected to Database!");
    });
}

connectToDb();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
