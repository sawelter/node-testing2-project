const heroesRouter = require('./heroes/heroes-router');
const express = require('express');

const server = express();

server.use(express.json());
server.use('/heroes', heroesRouter);

module.exports = server;