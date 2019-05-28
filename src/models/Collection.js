const Mongoose = require("mongoose");
const { Curator } = require('./Curator')

const Schema = Mongoose.Schema;
const ObjectId = Mongoose.Types.ObjectId;

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

Collection = Mongoose.model("Collection", collectionSchema)

async function createCollection(args) {
  try {
    const newCollection = new Collection({
      name: args.name,
      owner: args.owner,
      tags: [...args.tags],
      issues: [],
      img: args.img,
      blurb: args.blurb,
    });
    const collection = await newCollection.save();
    return Curator.findOneAndUpdate({_id: new ObjectId(args.owner)}, { $push: { collections: collection.id } } )
  } catch (err) {
    throw err;
  };
};

async function editCollection(args) {
  await Collection.updateOne({_id: new ObjectId(args.id)}, {
    name: args.name,
    tags: args.tags,
    img: args.img,
    blurb: args.blurb,
  });
  return Collection.findOne({_id: new ObjectId(args.id)});
}

const findCollectionById = id => 
    Collection.findOne({_id: new ObjectId(id)}, (err, data) => {
    if (err) throw err;
    return data;
  });

module.exports = {
  Collection,
  createCollection,
  editCollection,
  findCollectionById,
};