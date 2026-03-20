const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  locationFound: {
    type: String
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['lost', 'found'],
    default: 'lost'
  },
  resolved: {
    type: Boolean,
    default: false
  },
  photoPath: {
    type: String
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);
