const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const contentSchema = new Schema({
  subtitle: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  commentary: {
    type: String,
    required: false
  }
}); 

module.exports = Mongoose.model("Content", contentSchema)