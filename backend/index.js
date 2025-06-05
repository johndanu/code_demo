const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const db = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Add this to parse JSON request bodies
app.use('/api/auth', authRoutes);

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
