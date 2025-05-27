const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./model');
const routes = require('./router/index');
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use('/', routes);

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
    return db.sequelize.sync();  
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});