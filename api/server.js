const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');
const cors = require('cors');

const teacherRouter = require('../teachers/teachers-router.js');
const classRouter = require('../classes/classes-router.js');

const server = express();

server.use(helmet());
// server.use(morgan('combined'));
server.use(express.json());
server.use(cors());

server.use('/api/teachers', teacherRouter);
server.use('/api/classes', classRouter);

server.get('/', (req, res) => {
  res.send("See README.md for API docs");
});

module.exports = server;
