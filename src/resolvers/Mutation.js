const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId, getCuratorId } = require('../utils');
const { createUser, findUser } = require('../models/User');
const { createCurator, findCurator, findCuratorById } = require('../models/Curator');
const { createCollection, editCollection, findCollectionById } = require('../models/Collection');
const { createIssue } = require('../models/Issue')

async function userSignup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
};

async function userLogin(parent, args, context, info) {
  const user = await findUser({ email: args.email })
  if (!user) throw new Error('No such user found')

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) throw new Error('Invalid password')

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
};

async function curatorSignup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const curator = await createCurator({ ...args, password })

  const token = jwt.sign({ curatorId: curator.id }, APP_SECRET)

  return {
    token,
    curator,
  };
};

async function curatorLogin(parent, args, context, info) {
  const curator = await findCurator({ email: args.email })
  if (!curator) throw new Error('No such curator found')

  const valid = await bcrypt.compare(args.password, curator.password)
  if (!valid) throw new Error('Invalid password')

  const token = jwt.sign({ curatorId: curator.id }, APP_SECRET)

  return {
    token,
    curator,
  };
};

async function collectionCreate(parent, args, context, info) {
  const owner = getCuratorId(context);
  await createCollection({ ...args, owner });

  return findCuratorById(owner);
};

async function collectionEdit(parent, args, context, info) {
  const owner = getCuratorId(context);
  const collection = await findCollectionById(args.id);
  console.log('check 1: ', owner ,'check2: ', collection.owner)
  if (owner == collection.owner) {
    return await editCollection(args);
  } else {
    throw new Error('Not Authorised');
  };
};

async function issueCreate(parent, args, context, info) {
  const owner = getCuratorId(context);
  const collection = await findCollectionById(args.collectionId);
  const serialNum = collection.issues.length + 1;
  console.log('check 1: ', owner ,'check2: ', collection.owner)
  if (owner == collection.owner) {
    await createIssue({ ...args, serialNum });

    return findCuratorById(owner);
  } else {
    throw new Error('Not Authorised');
  };
};

module.exports = {
  userSignup,
  userLogin,
  curatorSignup,
  curatorLogin,
  collectionCreate,
  collectionEdit,
  issueCreate,
  // issueEdit,
}