const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
