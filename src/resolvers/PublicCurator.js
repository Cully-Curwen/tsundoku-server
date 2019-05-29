const { findCollectionById } = require('../models/Collection');

async function collections(parent, args, context, info) {
  return parent.collections.map(async id  => await findCollectionById(id))
};

module.exports = {
  collections,
}