// require('dotenv').config();
const { mongoDB } = require('../config/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = mongoDB.url;

db.tutorials = require('./tutorial.model.js')(mongoose);
db.users = require('./user.model.js')(mongoose);

module.exports = db;
