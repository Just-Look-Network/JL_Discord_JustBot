require('dotenv').config();
const { mongoDB } = require('../config/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = mongoDB.url;
console.log(db.url);
// db.url = dbConfig.url;
db.tutorials = require('./tutorial.model.js')(mongoose);

module.exports = db;
