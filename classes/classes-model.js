const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  addScore
};

function find() {
  return db('classes');
}

function findBy(filter) {
  return db('classes').where(filter);
}

async function add(classroom) {
  console.log(classroom);
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

async function findScoreById(id) {
  return db('scores')
    .where({ id })
    .first();
}

async function addScore(score) {
  const id = score.classId;
  if (!score.streak) {
    await db('classes')
      .where({ id })
      .update({ streakSince: db.fn.now() });
  }
  const newStreak = await db('classes')
    .where({ id })
    .select('streakSince')
    .first();
  const newId = await db('scores').insert(score);
  const newScore = await findScoreById(Number(newId));
  return { ...newScore, streakSince: newStreak.streakSince };
}