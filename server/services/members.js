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
    account_id: id,
  })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new CustomError('NotUniqueId', 409, err);  // 409
      } else {
        throw new Error(err);
      }
    });
};

/**
 * @desc [서비스] 트레이너가 보유한 모든 회원목록을 가져온다.
 * @param account_id
 * */
const getAll = async account_id => {
  try {
    const result = await db.member.findAll({ where: { account_id: account_id }, raw: true });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const remove = async query => {
  const { ids } = query;
  const array = JSON.parse(ids);

  const count = await db.member.destroy({
    where: { id: array }
  }).catch(err => {
    throw new Error(err);
  })

  //console.log(count);
};

module.exports = { create, getAll, remove };
