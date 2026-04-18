const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Connect to MongoDB
connectDB();

const app = express();

// Use the PORT provided by the hosting platform (like Render)
const PORT = process.env.PORT || 5000;

// Update CORS to allow your Vercel URL in production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Fallback to local Vite dev server
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health Check for Render/Railway monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
