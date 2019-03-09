const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  avatar: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);