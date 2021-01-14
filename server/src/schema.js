const { gql } = require('apollo-server');

const typeDefs = gql `
type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch,
    getAllTodo: [Todos],
}

input TodoInput {
    id: String,
    title: String,
    isActive: Boolean,
    type: String,
    datetime: String 
}

type Mutation {
    getAllActive(text: String): String,
    createTodoItem(item: TodoInput): String,
    putItemActive(item: TodoInput): String,
    deleteTodo(id: String!): String
}

type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Todos {
    id: String,
    title: String,
    isActive: Boolean,
    type: String,
    datetime: String 
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}
`;

module.exports = typeDefs;