const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId, getCuratorId } = require('../utils');
const { createUser, editUser, findUser, findUserById } = require('../models/User');
const { createCurator, editCurator, findCurator, findCuratorById } = require('../models/Curator');
const { createCollection, editCollection, findCollectionById } = require('../models/Collection');
const { createIssue, editIssue, findIssueById } = require('../models/Issue');

async function userSignup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

async function userLogin(parent, args, context, info) {
  const user = await findUser({ email: args.email });
  if (!user) throw new Error('No such user found');

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

async function userUpdate(parent, args, context, info) {
  const userId = getUserId(context);
  const userAuth = await findUserById(userId);
  if (!userAuth) throw new Error('No such user found');
  
  const valid = await bcrypt.compare(args.password, userAuth.password);
  if (valid){
    const password = args.newPassword ? await bcrypt.hash(args.newPassword, 10) : userAuth.password;
    const newDetails = {
      id: userId,
      name: args.name ? args.name : userAuth.name,
      email: args.email ? args.email : userAuth.email,
      password,
    };

    const user = await editUser(newDetails);
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    
    return {
      token,
      user,
    };
  } else {
    throw new Error('Invalid password');
  };
};

async function curatorSignup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const curator = await createCurator({ ...args, password });

  const token = jwt.sign({ curatorId: curator.id }, APP_SECRET);

  return {
    token,
    curator,
    badge: "Curator"
  };
};

async function curatorLogin(parent, args, context, info) {
  const curator = await findCurator({ email: args.email });
  if (!curator) throw new Error('No such curator found');

  const valid = await bcrypt.compare(args.password, curator.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ curatorId: curator.id }, APP_SECRET);

  return {
    token,
    curator,
    badge: "Curator"
  };
};

async function curatorUpdate(parent, args, context, info) {
  const curatorId = getCuratorId(context);
  const curatorAuth = await findCuratorById(curatorId);
  if (!curatorAuth) throw new Error('No such curator found');
  
  const valid = await bcrypt.compare(args.password, curatorAuth.password);
  if (!valid) throw new Error('Invalid password');

  const newDetails = {
    id: curatorId,
    name: args.name ? args.name : curatorAuth.name,
    email: args.email ? args.email : curatorAuth.email,
    password: args.newPassword ? args.newPassword : curatorAuth.password,
    img: args.img ? args.img : curatorAuth.img,
    blurb: args.blurb ? args.blurb : curatorAuth.blurb,
  };

  const curator = await editCurator(newDetails);
  const token = jwt.sign({ curatorId: curator.id }, APP_SECRET);
  
  return {
    token,
    curator,
    badge: "Curator"
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
  if (owner == collection.owner) {
    await createIssue({ ...args, serialNum });

    return findCuratorById(owner);
  } else {
    throw new Error('Not Authorised');
  };
};

async function issueEdit(parent, args, context, info) {
  const owner = getCuratorId(context);
  const issue = await findIssueById(args.id);
  const collection = await findCollectionById(issue.childOf);
  if (owner == collection.owner) {
    return await editIssue(args);
  } else {
    throw new Error('Not Authorised');
  };
};

module.exports = {
  userSignup,
  userLogin,
  userUpdate,
  curatorSignup,
  curatorLogin,
  curatorUpdate,
  collectionCreate,
  collectionEdit,
  issueCreate,
  issueEdit,
}