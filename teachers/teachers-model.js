const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
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

async function findById(teacherId) {
  const [teacher, classes] = await Promise.all([
    db('teachers')
      .where({ id: teacherId })
      .first() || null,
    db('classes')
      .where({ teacherId }) || []
  ]);
  if (teacher) teacher.classes = classes;
  return teacher || null;
}

async function update(id, changes) {
  await db('teachers')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  return await db('teachers')
    .where({ id })
    .del();
}