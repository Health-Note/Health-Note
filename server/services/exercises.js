const { db } = require('../models');

const getAll = async () => {
  return await db.exercise.findAll({
    attributes: ['id', 'exerciseNe'], raw: true // data 만 취급할거다
  })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = { getAll };
