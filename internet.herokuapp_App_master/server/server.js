const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authenticateToken = require('./middlewares/auth');
const cors = require('cors');

//Import Routes
const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');

// App Port
const port = process.env.PORT || 8080;

//Connect to DB
try {
  mongoose.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('DataBase is up and running');
    }
  );
} catch (err) {
  console.log(
    'Something went wrong, cant connect to database'
  );
}

// MiddleWears
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-store, no-cache');
  next();
});

// Use Routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/tasks', authenticateToken, TaskRoutes);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
