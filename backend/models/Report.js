const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'Anonymous Twin' },
  date: { type: Date, default: Date.now },
  inputs: { type: Object, required: true },
  scores: { type: Object, required: true },
  risks: { type: Object, required: true },
  suggestions: { type: Array, required: true },
  chartData: { type: Array, required: true },
  healthSummary: { type: String },
  pdfData: { type: String } // Base64 storage
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
