const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
  visitId: String,
  userId: String,
  name: String,
});

module.exports = mongoose.model("Visit", visitSchema);
