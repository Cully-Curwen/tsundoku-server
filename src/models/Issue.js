const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const issueSchema = new Schema({

  title: {
    type: String,
    required: false 
  },
  commentary: {
    type: String,
    required: false
  },
  childOf: {
    type: Schema.Types.ObjectId,
    ref: "Collection"
  },
  serialNum: {
    type: Number,
    required: true  
  },
  content: [{
    type: Schema.Types.ObjectId,
    ref: "Content"
  }],
  createdAt: {
    type: String,
    required: true 
  },
  updatedAt: {
    type: String,
    required: true 
  }
});  

module.exports =  Mongoose.model("Issue", issueSchema)