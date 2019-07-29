const router = require('express').Router();

const Classes = require('./classes-model');
const restricted = require('../middleware/restricted');
const { validateClass } = require('../middleware/validators');

router.post('/add', restricted, validateClass, (req, res) => {
  Classes.add(req.classroom)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: 'Class could not be added' });
    });
});

router.get('/', restricted, async (req, res) => {
  try {
    const classrooms = await Classes.find();
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get classes' });
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classes.findById(id);

    if (classroom) {
      res.status(200).json(classroom);
    } else {
      res.status(404).json({ message: `Could not find class with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get class' });
  }
});

router.put('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
    if (Object.keys(changes).length === 0) {
    res.status(404).json({ message: 'Missing class data' });
    return;
  }

  try {
    const classroom = await Classes.findById(id);

    if (classroom) {
      const updated = await Classes.update(id, changes);
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: `Could not find class with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update class' });
  }
});

router.delete('/:id', restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Classes.remove(id);

    if (deleted) {
      res.status(200).json({ message: `Class with id ${id} deleted` });
    } else {
      res.status(404).json({ message: `Could not find class with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete class' });
  }
});

module.exports = router;
