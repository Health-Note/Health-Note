const { db } = require('../models');

const create = async body => {
  const { name, phoneNum, gender, startDate, endDate, totalPT, height } = body;

  await db.Member.create({
    PhoneNum: phoneNum,
    Name: name,
    Gender: gender,
    StartTime: startDate,
    EndTime: endDate,
    TotalPT: totalPT,
    UsedPT: 0,
    Height: height,
    IsRegistered: true,
    TrainerId: req.user,
  })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        //return res.status(400).json({ msg: '회원이 이미 존재합니다.' });
        // res.status(409).end();
        throw new Error('회원이 이미 존재합니다.');
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
      //console.log(err);
      //res.status(500).send('server err');
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
