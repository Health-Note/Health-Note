const { db } = require('../models');

const getAll = async () => {
  return await db.exercise.findAll({
    attributes: ['id', 'exerciseName'], raw: true // data 만 취급할거다
  })
};

module.exports = { getAll };
