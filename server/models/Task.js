const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

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
    type: Number,
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
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  toerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  doerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task = model("Task", taskSchema);

module.exports = Task;
