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

function findById(id) {
  return db('teachers')
    .where({ id })
    .first();
}
