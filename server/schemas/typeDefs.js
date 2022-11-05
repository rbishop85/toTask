const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    photo: String
    rating: [Int]
    tasksPosted: [Task]!
    tasksAssigned: [Task]!
  }

  type Task {
    _id: ID
    name: String
    description: String
    value: Int
    postDate: Int
    dueDate: Int
    completedDate: Int
    tags: [Tag]
    toerId: [User]
    doerId: [User]
  }

  type Tag {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    tasks: [Task]
    task: Task
    tags: [Tag]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTask(name: String!, description: String!, value: Int!, dueDate: Int!, tags: [ID]): Task
  }
`;

module.exports = typeDefs;
