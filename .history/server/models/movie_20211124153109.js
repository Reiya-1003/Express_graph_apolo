const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
});

moduls.exorts = mongoose.model("Movie", movieSchema);
