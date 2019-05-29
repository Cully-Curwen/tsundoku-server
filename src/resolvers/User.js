const { findCollectionById } = require('../models/Collection');
const { findCuratorById } = require('../models/Curator');
const { findIssueById } = require('../models/Issue');

async function curators(parent, args, context, info) {
  return parent.curators.map(async id => await findCuratorById(id));
};

async function collections(parent, args, context, info) {
  return parent.collections.map(async id  => await findCollectionById(id));
};

async function issues(parent, args, context, info) {
  return parent.issues.map(async id  => await findIssueById(id));
};

module.exports = {
  curators,
  collections,
  issues,
};