const { AuthenticationError } = require('apollo-server-express');
const { User, Task, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .populate('tasksPosted')
      .populate('tasksAssigned');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate('tasksPosted')
        .populate('tasksAssigned');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // tasks - All Tasks
    tasks: async () => {
      return Task.find()
      .populate('tag')
      .populate('toerId');
    },
    // task - One Task
    task: async (parent, { _id }) => {
      return Task.findOne({ _id })
      .populate('tag')
      .populate('toerId')
      .populate('doerId');
    },
    // tags - All Tags
    tags: async () => {
      return Tag.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // addTask - (Create new task)
    addTask: async (parent, { name, description, value, dueDate, tag }, context) => {
      const task = await Task.create({ name, description, value, dueDate, tag, toerId: context.user._id });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { tasksPosted: task._id } }
      );

      return task;
    },
    // editTask - (Update an existing task)
    editTask: async (parent, args, context) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: args._id, toerId: context.user._id },
          args, 
          {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    // deleteTask - (Delete the Task)
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user ) {
        return Task.findOneAndDelete({ _id: taskId, toerId: context.user._id });
      }
      if (context.user) {
        const task = await Task.findOneAndDelete({
          _id: taskId,
          toerId: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { taskPosted: task._id } }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // updateUser - (Update user, possibly adding their photo)
  },
};

module.exports = resolvers;
