const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
connectDB();

const app = express();

// Use the PORT provided by the hosting platform (like Render)
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Health Check for Render/Railway monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
