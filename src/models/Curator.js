const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

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

const findCurator = async (args) => {
  return await Curator.findOne(args) 
}

module.exports = {
  createCurator,
  findCurator,
}