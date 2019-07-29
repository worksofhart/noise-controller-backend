const router = require('express').Router();

const restricted = require('../middleware/restricted.js');

router.get('/', restricted, (req, res) => {
  return null;
});

module.exports = router;
