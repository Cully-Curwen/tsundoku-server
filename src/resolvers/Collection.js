const { findCurator } = require('../models/Curator');

function owner(parent, args, context, info) {
  return findCurator({id: args.owner});
};

module.exports = {
  owner,
}