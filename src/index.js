const { GraphQLServer } = require("graphql-yoga");
const Mongoose = require("mongoose");
const { mongodbUriUser, mongodbUriClusterAndCollection, mongodbUserPassword} = require('./secrets')

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Curator = require('./resolvers/Curator')
const Collection = require('./resolvers/Collection');
const Content = require('./resolvers/Content');
const Issue = require('./resolvers/Issue');

const resolvers = {
  Query,
  Mutation,
  Curator,
  Collection,
  Content,
  Issue,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({...request}),
});

const options = {
  port: 4000,
};

Mongoose.connect(
  mongodbUriUser + mongodbUserPassword + mongodbUriClusterAndCollection,
  { useNewUrlParser: true, useFindAndModify: false  }
)
  .then(() => {
    server.start(options, ({ port }) => console.log(`Connected to DB\nServer started, listening on port ${port} for incoming requests.`
    ));
  })
  .catch((err) => console.log('Did not connect to DB\nErrror: ', err));