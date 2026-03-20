const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'class_representative', 'regular_user'],
    default: 'regular_user'
  },
  contact: {
    type: String,
    default: null
  },
  classInfo: {
    // Only relevant if role is class_representative
    class: { type: String, default: null },
    section: { type: String, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
