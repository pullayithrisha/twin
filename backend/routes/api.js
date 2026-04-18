const express = require('express');
const router = express.Router();
const simulator = require('../services/simulator');
const aiModel = require('../services/aiModel');
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// POST /api/ai/analyze
router.post('/ai/analyze', async (req, res) => {
  try {
    const twinState = req.body;
    
    const currentMetrics = simulator.calculateCurrentMetrics(twinState);
    const projections = simulator.generateProjections(twinState, currentMetrics);
    
    // AI-based Risk Scores
    const aiData = await aiModel.generateAnalysis(twinState);
    
    const risks = simulator.generateRiskScores(twinState, currentMetrics, aiData);
    const biologicalAge = simulator.estimateBiologicalAge(twinState, currentMetrics);
    const organStress = simulator.calculateOrganStress(risks);
    const healthScore = simulator.calculateHealthScore(biologicalAge, twinState.biometrics.age, risks);

    res.json({
      currentMetrics,
      projections,
      risks,
      biologicalAge,
      organStress,
      healthScore,
      healthSummary: aiData.healthSummary
    });
  } catch (error) {
    console.error('Error in /api/ai/analyze:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/ai/recommend
router.post('/ai/recommend', async (req, res) => {
  try {
    const twinState = req.body;
    const aiData = await aiModel.generateRecommendations(twinState);
    res.json({ suggestions: aiData.suggestions || [] });
  } catch (error) {
    console.error('Error in /api/ai/recommend:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/report/save (Save a report)
router.post('/report/save', auth, async (req, res) => {
  try {
    const { name, inputs, scores, risks, suggestions, chartData, healthSummary, pdfData } = req.body;
    const newReport = new Report({
      userId: req.user.id,
      name,
      inputs,
      scores,
      risks,
      suggestions,
      chartData,
      healthSummary,
      pdfData
    });
    const saved = await newReport.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// GET /api/reports
router.get('/reports', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// GET /api/reports/:id
router.get('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the report' });
  }
});

module.exports = router;
