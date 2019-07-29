const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('teachers');
}

function findBy(filter) {
  return db('teachers').where(filter);
}

async function add(teacher) {
  const [id] = await db('teachers').insert(teacher);

  return findById(id);
}

async function findById(teacher_id) {
  const [teacher, classes] = await Promise.all([
    db('teachers')
      .where({ id: teacher_id })
      .first() || null,
    db('classes')
      .where({ teacher_id }) || []
  ]);
  if (teacher) teacher.classes = classes;
  return teacher || null;
}
