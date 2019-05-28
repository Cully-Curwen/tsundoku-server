const { findCurator } = require('../models/Curator');
const { findIssueById } = require('../models/Issue');

function owner(parent, args, context, info) {
  return findCurator({id: args.owner});
};

async function issues(parent, args, context, info) {
  return parent.issues.map(async id  => await findIssueById(id));
};

module.exports = {
  owner,
  issues,
};