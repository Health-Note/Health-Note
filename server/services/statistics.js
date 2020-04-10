const logger = require('../loaders/logger');
const { db, sequelize } = require('../models');
const Op = sequelize.Op;

const get = async () => {
  const result = await db.routine.findAndCountAll({
    where: {
      MemberId: 21,
      ExerciseCode: {
        [Op.between]: [100, 199],
      },
    },
  })
  .then(result => {
    return result.dataValues
  })
  .catch(err => {
    throw new Error(err);
  });
  console.dir(result);
  return result;
};

module.exports = { get }
