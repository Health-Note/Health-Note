const { db } = require('../models');
const CustomError = require('../common/error');

const create = async body => {
  const { name, phoneNum, gender, totalPT, age } = body;

  await db.Member.create({
    phoneNum: phoneNum,
    name: name,
    gender: gender,
    age: age,
    totalPT: totalPT,
    usedPT: 0,
    registration: 1,
    trainerId: req.user,
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
  return await db.Member.findAll({ where: { TrainerId: id } })
    .then(result => {
      return result.dataValues;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const remove = async body => {
  const selectedRow = body;
  console.log('selectedRow', selectedRow);
  
  if (selectedRow.length === 1) {
    await db.Member.destroy({
      where: { PhoneNum: selectedRow[0].key },
    })
      .catch(err => {
        throw new Error(err);
      });
  } else if (selectedRow.length > 1) {
    const keys = selectedRow.map(cv => cv.key);

    await db.Member.destroy({
      where: { PhoneNum: keys },
    })
      .catch(err => {
        throw new Error(err);
      });
  } 

};

module.exports = { create, getAll, remove };
