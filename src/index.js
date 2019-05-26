const { GraphQLServer } = require("graphql-yoga");
const Mongoose = require("mongoose");

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation') 

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({...request}),
});

const options = {
  port: 4000,
};

const mongodbPass = 'test';

Mongoose.connect(
  `mongodb+srv://CCurwen:${mongodbPass}@tsundoku-xvgwb.mongodb.net/tsundoku_test?retryWrites=true`,
  { useNewUrlParser: true }
)
  .then(() => {
    server.start(options, ({ port }) => console.log(`Connected to DB\nServer started, listening on port ${port} for incoming requests.`
    ));
  })
  .catch((err) => console.log('Did not connect to DB\nErrror: ', err));