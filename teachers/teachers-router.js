const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

const Teachers = require('./teachers-model');
const restricted = require('../middleware/restricted');
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Teachers.findBy({ username })
    .first()
    .then(teacher => {
      if (teacher && bcrypt.compareSync(password, teacher.password)) {
        // produce a token
        const token = generateToken(teacher);
        delete teacher.password;
        res.status(200).json({
          ...teacher,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error logging in' });
    });
});

router.get('/', restricted, async (req, res) => {
  try {
    const teachers = await Teachers.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teachers' });
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teachers.findById(id);
    delete teacher.password;
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ message: 'Could not find teacher with given id' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teacher' });
  }
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
