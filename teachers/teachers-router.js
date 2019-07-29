const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

const Teachers = require('./teachers-model');
const { validateTeacher } = require('../middleware/validators');

router.post('/register', validateTeacher, (req, res) => {
  let teacher = req.body;
  const hash = bcrypt.hashSync(teacher.password, 10); // 2 ^ n
  teacher.password = hash;

  Teachers.add(teacher)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: 'Teacher could not be added' });
    });
});

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
