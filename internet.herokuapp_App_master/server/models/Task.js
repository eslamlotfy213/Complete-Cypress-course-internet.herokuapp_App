const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  item: {
    type: String,
    min: 3,
  },
  isCompleted: {
    type: Boolean,
    min: 3,
    default: false,
  },
  userID: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
