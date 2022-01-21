const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoSchema = new Schema({
  title: String,
  img: String,
  movienumber: Number,
});

module.exports = mongoose.model("Favo", favoSchema);
