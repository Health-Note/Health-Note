const { db } = require('../models');

const getAll = async () => {
  return await db.Exercise.findAll({
    attributes: ['exerciseCode', 'exerciseName'],
  })
    .then(result => {
      return result.dataValues;
    })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = { getAll };
