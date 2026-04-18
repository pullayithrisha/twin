require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await User.collection.dropIndexes();
      console.log('Indexes dropped. Recreating...');
      await User.syncIndexes();
      console.log('Indexes synced successfully.');
    } catch (e) {
      console.error(e);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
