const Mongoose = require("mongoose");
const { Collection } = require('./Collection')

const Schema = Mongoose.Schema;
const ObjectId = Mongoose.Types.ObjectId;

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
    id: {
      type: String,
      required: true,
    },
    subTitle: {
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
  }],
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
      content: [...args.content],
    });
    const issue = await newIssue.save();
    return Collection.findOneAndUpdate({_id: new ObjectId(args.collectionId)}, { $push: { issues: issue.id } } )
  } catch (err) {
    throw err;
  };
};

async function editIssue(args) {
  await Issue.updateOne({_id: new ObjectId(args.id)}, {
    title: args.title,
    commentary: args.commentary,
    content: [...args.content],
  });
  return Issue.findOne({_id: new ObjectId(args.id)});
}

const findIssueById = async id => Issue.findOne({_id: new ObjectId(id)}, (err, data) => {
  if (err) throw err;
  return data;
});


module.exports = {
  Issue,
  createIssue,
  editIssue,
  findIssueById,
};