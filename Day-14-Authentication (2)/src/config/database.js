const mongoose = require("mongoose");

function connnectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to db");
  });
}

module.exports = connnectToDb;
