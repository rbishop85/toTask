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
      .populate({path: 'tasksPosted', options: { sort: { postDate: -1 }}})
      .populate('tasksAssigned');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate({path: 'tasksPosted', options: { sort: { postDate: -1 }}})
        .populate({path: 'tasksAssigned', options: { sort: { postDate: -1 }}});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // tasks - All Tasks
    tasks: async () => {
      return Task.find()
      .populate('tag')
      .sort({ postDate: -1 });
    },
    // task - One Task
    task: async (parent, { _id }) => {
      return Task.findOne({ _id })
      .populate('tag')
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

    addTask: async (parent, { name, description, value, dueDate, tag, postDate }, context) => {

      const task = await Task.create({ name, description, value, dueDate, postDate, tag, toerId: context.user.username });

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
          { _id: args._id, toerId: context.user.username },
          args, 
          { new: true }
        );
      }

      throw new AuthenticationError('Not logged in');
    },
    // deleteTask - (Delete the Task)
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({
          _id: taskId,
          toerId: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasksPosted: taskId } }
        );

        await User.findOneAndUpdate(
          { tasksAssigned: taskId },
          { $pull: { tasksAssigned: taskId } }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // assignTask - (Assign Task to Current User)
    assignTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          { doerId: context.user.username }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasksAssigned: taskId } }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // unassignTask - (Unassign Task from Current User)
    unassignTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          { doerId: "" }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasksAssigned: taskId } }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // updateUserPhoto - (update user's profile photo)
    updateUserPhoto: async (parent, { photoUrl }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { photo: photoUrl }, 
          { new: true }
        );
      }

      throw new AuthenticationError('Not logged in');
    },
    addComment: async (parent, { taskId, commentText }, context) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { taskId, commentId }, context) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
