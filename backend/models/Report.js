const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  name: { type: String, default: 'Anonymous Twin' },
  date: { type: Date, default: Date.now },
  inputs: { type: Object, required: true },
  scores: { type: Object, required: true },
  risks: { type: Object, required: true },
  suggestions: { type: Array, required: true },
  chartData: { type: Array, required: true },
  healthSummary: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
