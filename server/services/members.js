const { db, sequelize } = require('../models');
const CustomError = require('../common/error');

/**
 * @module service
 * @function
 * @desc 회원을 생성한다.
 * @param body {object} name, phoneNum, gender, totalPT, age
 * @param id {int}
 * */
const create = async (body, accountId) => {
  console.log("body", body);
  const { memberName, phoneNum, gender, totalPT, age } = body;

  const result = await db.member.create({
    phoneNum: phoneNum,
    memberName: memberName,
    gender: gender,
    age: age,
    totalPT: totalPT,
    usedPT: 0,
    registrationStatus: 1,
    accountId: accountId,
  })
  
  return { id: result.id };
};

const getAll = async id => {
  return await db.member.findAll({ where: { accountId: id }, raw: true });
};

const remove = async query => {
  const { ids } = query;
  const array = JSON.parse(ids);

  await sequelize.transaction(async (t) => {

    await db.weightTraining.destroy({
      where: { memberId: array }
    })

    await db.routine.destroy({
      where: { memberId: array }
    })

    await db.schedule.destroy({
      where: { memberId: array }
    })

    await db.memo.destroy({
      where: { memberId: array }
    })

    await db.biologicalHistory.destroy({
      where: { memberId: array }
    })

    const count = await db.member.destroy({
      where: { id: array }
    })

  })
  
};

const hold = async params => {
  const { memberId } = params; 

  await db.member.update({
    registrationStatus: 2
  }, {
    where: { id : memberId }
  })

}


module.exports = { create, getAll, remove, hold };
