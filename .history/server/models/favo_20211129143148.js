const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoSchema = new Schema({
  title: String,
  img: String,
  movieId: Number,
});

module.exports = mongoose.model("Favo", favoSchema);
