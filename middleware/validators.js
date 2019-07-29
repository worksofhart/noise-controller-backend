const Teachers = require('../teachers/teachers-model.js');
// const Classes = require('../classes/classes-model.js');

module.exports = {
  validateTeacher
}

function validate(obj, keys='') {
  return keys.split('|').filter(key => !obj.hasOwnProperty(key));
}

function validateTeacher(req, res, next) {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    res.status(404).json({ message: 'Missing teacher data' });
    return;
  }
  const missing = validate(body, 'username|password|firstName|lastName|email');
  console.log(missing);
  if (missing.length > 0) {
    res.status(428).json({ message: `Missing required field(s): ${missing.join(', ')}` });
  } else next();
}
