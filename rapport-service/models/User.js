const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['Admin', 'Member', 'Guest'] },
});

module.exports = mongoose.model('User', userSchema);
