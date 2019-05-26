const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({

  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
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
  curators: [{
    type: Schema.Types.ObjectId,
    ref: "Curator"
  }],
  issues: [{
    type: Schema.Types.ObjectId,
    ref: "Issue"
  }],
});

User = Mongoose.model("User", userSchema)

async function createUser(args) {
  try {
    const user = await User.findOne({ email: args.email }) 
    if (user) {
      throw new Error("User exists already.");
    }
    const newUser = new User({
      name: args.name,
      email: args.email,
      password: args.password,
    });
    return await newUser.save();
  } catch(err) {
    throw err 
  };
};

const findUser = async (args) => {
  return await User.findOne(args) 
}

module.exports = {
  createUser,
  findUser,
}