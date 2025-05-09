const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  deadline: Date,
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Task', taskSchema);
