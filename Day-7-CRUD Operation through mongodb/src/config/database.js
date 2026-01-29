const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://prakashnitya07_db_user:F4k2qkr@cluster0.1tuewkm.mongodb.net/Day-7",
    )
    .then(() => {
      console.log("Connected to db");
    });
}

module.exports = connectToDb;
