require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { dbName: 'TwinHealthAI' })
  .then(async () => {
    console.log('Connected to MongoDB TwinHealthAI');
    try {
      await mongoose.connection.db.dropCollection('users');
      console.log('users collection dropped.');
    } catch (e) {
      if (e.code === 26) {
        console.log('users collection did not exist.');
      } else {
        console.error('Error dropping collection:', e);
      }
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
