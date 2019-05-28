const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;
const ObjectId = Mongoose.Types.ObjectId;

const curatorSchema = new Schema({
  name: {
    type:String,
    required: true 
  },
  email: {
    type:String,
    required: true 
  },
  password: {
    type: String,
    required: true
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: "Collection"
  }],
  img: {
    type:String,
    required: false
  },
  blurb: {
    type:String,
    required: false
  }
});

Curator = Mongoose.model("Curator", curatorSchema) ;

async function createCurator(args) {
  try {
    const curator = await Curator.findOne({ email: args.email }) 
    if (curator) {
      throw new Error("Curator exists already.");
    }
    const newCurator = new Curator({
      name: args.name,
      email: args.email,
      password: args.password,
      img: args.img,
      blurb: args.blurb,
    });
    return await newCurator.save();
  } catch(err) {
    throw err 
  };
};

async function editCurator(args) {
  try {
    await Curator.updateOne({_id: new ObjectId(args.id)}, {
      name: args.name,
      email: args.email,
      password: args.password,
      img: args.img,
      blurb: args.blurb,
    });
    return Curator.findOne({_id: new ObjectId(args.id)});
  } catch (err) {
    throw err;
  };
};

const findCurator = async args => await Curator.findOne({ args })

const findCuratorById = async id => await Curator.findOne({_id: new ObjectId(id)});

module.exports = {
  Curator,
  createCurator,
  editCurator,
  findCurator,
  findCuratorById,
}