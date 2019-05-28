const { findCollections } = require('../models/Collection');

function collections(parent, args, context, info) {
  return findCollections(args.collections);
};

module.exports = {
  collections,
}