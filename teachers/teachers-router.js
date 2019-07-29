const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

function generateToken(teacher) {
  const jwtPayload = {
    subject: teacher.id,
    username: teacher.username,
  };

  const jwtOptions = {
    expiresIn: '12h',
  };
  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;
