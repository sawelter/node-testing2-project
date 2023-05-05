const knex = require('knex');

const config = require('../knexfile.js');

const environment = process.env.NODE_DEV || 'development';

const db = knex(config[environment]);

module.exports = db;