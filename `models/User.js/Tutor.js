const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjects: [{ type: String, required: true }],
  bio: String,
  education: String,
  experience: String,
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  availableSlots: [{
    date: Date,
    times: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tutor', tutorSchema);