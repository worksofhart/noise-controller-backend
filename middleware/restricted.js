const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  // get the token from Authorization header
  const token = req.headers.authorization;

  // verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        // invalid token
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // valid token
        // makes the token available to the rest of the api
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Must be logged in' });
  }
};