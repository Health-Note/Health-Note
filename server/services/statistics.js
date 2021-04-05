const logger = require('../loaders/logger');
const { db, sequelize } = require('../models');
const Op = sequelize.Op;

const getStatistics = async (memberId) => {
  try {
    const result = await db.weightTraining.findAll({
      where: {
        memberId: memberId,
      },
      group: ['exerciseCode'],
      include: [{
        model: db.exercise,
        attributes: ['exerciseName'],
      }],
    });

    console.dir(result);
    return result;
  } catch (err) {
    console.log(err)
    throw err;
  }
};



module.exports = { getStatistics }
