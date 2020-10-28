const logger = require('../loaders/logger');
const { db, sequelize } = require('../models');
const Op = sequelize.Op;

const getStatistics = async (memberId) => {
  const result = await db.weightTraining.findAndCountAll({
    where: {
      memberId: memberId,
    },
  })
  .catch(err => {
    throw new Error(err);
  });
  console.dir(result);
  return result;
};



module.exports = { getStatistics }
