const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  dueDate: {
    type: Date,
    get: (timestamp) => dateFormat(timestamp),
  },
  completedDate: {
    type: Date,
    get: (timestamp) => dateFormat(timestamp),
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
  toerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Task = model("Task", taskSchema);

module.exports = Task;
