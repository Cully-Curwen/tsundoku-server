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
  
}

async function findCollections(collections) {
  return await Collection.find({_id: ({ $in : collections }) })
}

const findCollectionsById = async id => await Collection.find({_id: new ObjectId(id)});

module.exports = {
  createCollection,
  editCollection,
  findCollections,
  findCollectionsById,
};