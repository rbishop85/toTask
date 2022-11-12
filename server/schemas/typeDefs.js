const { gql } = require("apollo-server-express");

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
    value: String
    postDate: String
    dueDate: String
    completedDate: String
    tag: Tag
    toerId: User
    doerId: User
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
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
    task(_id: String!): Task
    tags: [Tag]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTask(
      name: String!
      description: String!
      value: String!
      dueDate: String
      postDate: String
      tag: ID
    ): Task
    editTask(
      _id: ID!
      name: String
      description: String
      value: Int
      dueDate: String
      completedDate: String
      tag: ID
      doerId: ID
    ): Task
    deleteTask(taskId: ID!): Task
    assignTask(taskId: ID!): Task
    unassignTask(taskId: ID!): Task
    updateUserPhoto(photoUrl: String!): User
    addComment(taskId: ID!, commentText: String!): Task
    removeComment(taskId: ID!, commentId: ID!): Task
  }
`;

module.exports = typeDefs;
