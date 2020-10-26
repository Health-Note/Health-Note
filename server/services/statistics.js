const logger = require('../loaders/logger');
const { db, sequelize } = require('../models');
const Op = sequelize.Op;

const get = async (memberId) => {
  const result = await db.weightTraining.findAndCountAll({
    where: {
      memberId: 10,
    },
  })
  .catch(err => {
    throw new Error(err);
  });
  console.dir(result);
  return result;
};



module.exports = { get }
