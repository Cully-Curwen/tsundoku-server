const { findCuratorById } = require('../models/Curator');
const { findLatestIssue } = require('../models/Issue');

function owner(parent, args, context, info) {
  return findCuratorById(args.owner);
};

async function issues(parent, args, context, info) {
  return findLatestIssue(parent.id)
};

module.exports = {
  owner,
  issues,
};