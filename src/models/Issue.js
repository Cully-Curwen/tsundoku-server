const Mongoose = require("mongoose");
const { Collection } = require('./Collection')

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
  }]
}, {timestamps: true}
);  

Issue =  Mongoose.model("Issue", issueSchema);

async function createIssue(args) {
  try {
    const newIssue = new Issue({
      title: args.title,
      commentary: args.commentary,
      childOf: args.collectionId,
      serialNum: args.serialNum,
      content: [],
    });
    const issue = await newIssue.save();
    Collection.findOneAndUpdate({_id: new ObjectId(args.collectionId)}, { $push: { issues: issue.id } } )
  } catch (err) {
    throw err;
  };
};

module.exports = {
  issueSchema,
  createIssue,

};