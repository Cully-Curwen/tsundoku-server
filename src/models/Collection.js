const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Curator",
  },
  tags: [{
    type: String,
    required: true,
  }],
  issues: [{
    type: Schema.Types.ObjectId,
    ref: "Issue"
  }],
  img: {
    type: String,
    required: false,
  },
  blurb: {
    type: String,
    required: false
  }
}); 

module.exports =  Mongoose.model("Collection", collectionSchema)