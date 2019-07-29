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
  return db('classes');
}

function findBy(filter) {
  return db('classes').where(filter);
}

async function add(classroom) {
  const [id] = await db('classes').insert(classroom);

  return findById(id);
}

async function findById(id) {
  return db('classes')
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db('classes')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  return await db('classes')
    .where({ id })
    .del();
}