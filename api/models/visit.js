const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
  userId: String,
  name: String,
});

module.exports = mongoose.model("Visit", visitSchema);
