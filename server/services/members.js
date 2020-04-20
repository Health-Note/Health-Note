const { db } = require('../models');
const CustomError = require('../common/error');

/**
 * @module service
 * @function
 * @desc 회원을 생성한다.
 * @param body {object} name, phoneNum, gender, totalPT, age
 * @param id {int}
 * */
const create = async (body, id) => {
  const { name, phoneNum, gender, totalPT, age } = body;
  try {
    const createResult = await db.member.create({
      phoneNum: phoneNum,
      name: name,
      gender: gender,
      age: age,
      totalPT: totalPT,
      usedPT: 0,
      registration: 1,
      account_id: id,
    });
    console.log("[service] createResult.id", createResult.id);
    if (createResult) {
      return await db.member.findOne({ where: { id: createResult.id } });
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new CustomError('NotUniqueId', 409, err);  // 409
    } else {
      throw new Error(err);
    }
  }
};

/**
 * @module service
 * @function
 * @desc 트레이너가 보유한 모든 회원목록을 가져온다.
 * @param account_id {int}
 * */
const getAll = async account_id => {
  try {
    const result = await db.member.findAll({ where: { account_id: account_id }, raw: true });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @module service
 * @function
 * @desc 회원을 삭제한다.
 * @param ids {array}
 * */
const remove = async ids => {
  try {
    const count = await db.member.destroy({
      where: { id: ids },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { create, getAll, remove };
