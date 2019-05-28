const { findCollectionById } = require('../models/Collection');

async function childOf(parent, args, context, info) {
  return await findCollectionById(parent.childOf);
};

module.exports = {
  childOf,
};