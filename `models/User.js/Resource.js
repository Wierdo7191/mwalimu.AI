const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['ebook', 'video', 'test', 'material'], required: true },
  subject: { type: String, required: true },
  gradeLevel: String,
  fileUrl: { type: String, required: true },
  thumbnailUrl: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);