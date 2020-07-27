require('dotenv').config();
// const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_DB_URL;
// db.url = dbConfig.url;
db.tutorials = require('./tutorial.model.js')(mongoose);

module.exports = db;
