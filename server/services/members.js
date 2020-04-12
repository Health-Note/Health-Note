const { db } = require('../models');
const CustomError = require('../common/error');

const create = async (body, id) => {
  
  const { name, phoneNum, gender, totalPT, age } = body;

  await db.member.create({
    phoneNum: phoneNum,
    name: name,
    gender: gender,
    age: age,
    totalPT: totalPT,
    usedPT: 0,
    registration: 1,
    trainerId: id,
  })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new CustomError('NotUniqueId', 409, err);  // 409
      } else {
        throw new Error(err);
      }
    });
};

const getAll = async id => {
  return await db.member.findAll({ where: { TrainerId: id }, raw: true })
    .then(result => {
      return result;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const remove = async query => {
  const { ids } = query;
  const array = JSON.parse(ids);

  const count = await db.member.destroy({
    where: { memberId: array }
  }).catch(err => {
    throw new Error(err);
  })

  //console.log(count);
};

module.exports = { create, getAll, remove };
