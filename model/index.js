// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/database'); 

const sequelize = config;
const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
