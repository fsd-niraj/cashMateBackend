const express = require('express'),
  cors = require('cors'),
  connectDB = require('./config/db'),
  routes = require('./routes/index'),
  app = express(),
  PORT = process.env.PORT;


async function init() {
  await connectDB()
  app.use(express.json());
  app.use(cors())

  app.use('/api', routes)

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

init();