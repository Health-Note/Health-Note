const { db } = require('../models');

const getAll = async () => {
  return await db.exercise.findAll({
    attributes: ['exerciseCode', 'exerciseName', 'targetCode', 'targetName'], 
    raw: true // data 만 취급할거다
  })
};

module.exports = { getAll };
