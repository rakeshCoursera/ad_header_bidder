const mongoose = require('mongoose');

const advertiserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adName: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  adImage: {
    type: String,
    required: true,
  },
  cpi: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
