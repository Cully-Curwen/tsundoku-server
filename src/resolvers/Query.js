const { APP_SECRET, getUserId, getCuratorId } = require('../utils');
const { findUserById } = require('../models/User')
const { findCuratorById, findAllCurators } = require('../models/Curator')
const { findAllCollections } = require('../models/Collection')
const { findAllIssues } = require('../models/Issue')

async function userData(parent, args, context, info) {
  const userId = await getUserId(context);
  return findUserById(userId);
};

async function curatorData(parent, args, context, info) {
  const curatorId = await getCuratorId(context);
  return findCuratorById(curatorId);
};

async function allIssues(parent, args, context, info) {
  return findAllIssues(args.childOf);
}

async function exploreCurators(parent, args, context, info) {
  return findAllCurators(args.curatorId);
}

async function exploreCurators(parent, args, context, info) {
  return findAllCurators(args);
}

async function exploreCollections(parent, args, context, info) {
  return findAllCollections(args);
}

module.exports = {
  userData,
  curatorData,
  allIssues,
  exploreCurators,
  exploreCollections,
};