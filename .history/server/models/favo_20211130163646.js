const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoSchema = new Schema({
  title: String,
  img: String,
  //   movieId: String,
});

module.exports = mongoose.model("Favo", favoSchema);
