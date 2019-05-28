const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId, getCuratorId } = require('../utils');
const { createUser, findUser } = require('../models/User');
const { createCurator, findCurator, findCuratorById } = require('../models/Curator');
const { createCollection, editCollection, findCollectionById } = require('../models/Collection');

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
  }
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
  }
};

async function collectionCreate(parent, args, context, info) {
  const owner = getCuratorId(context);
  await createCollection({ ...args, owner });

  return findCuratorById(owner);
}

async function collectionEdit(parent, args, context, info) {
  const owner = getCuratorId(context);
  await editCollection(args);

  return findCuratorById(owner);
}

module.exports = {
  userSignup,
  userLogin,
  curatorSignup,
  curatorLogin,
  collectionCreate,
  collectionEdit,
}