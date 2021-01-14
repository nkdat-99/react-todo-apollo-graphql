require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TodoAPI = require("./datasources/todo");
const LaunchAPI = require("./datasources/launch");
const { createStore } = require("./utils")

const store = createStore();

const dataSources = () => ({
    launchAPI: new LaunchAPI(),
    todoAPI: new TodoAPI(),
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
});

if (process.env.NODE_ENV !== 'test') {
    server.listen().then(() => {
        console.log(`
        Server is running!
        Listening on port 4000
        Query at https://studio.apollographql.com/dev
      `);
    });
}

module.exports = {
    typeDefs,
    resolvers,
    dataSources,
    ApolloServer,
    LaunchAPI,
    TodoAPI,
    store,
    server,
};