const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models_aws/index');
const auth = require('../middleware/auth');

router.post('/insertMember', auth, async (req, res) => {
  const {
    name,
    phoneNum,
    gender,
    startDate,
    endDate,
    totalPT,
    height,
  } = req.body;
  try {
    const member = await db.Member.findOne({ where: { Phonenum: phoneNum } });
    if (member) {
      return res.status(400).json({ msg: '회원이 이미 존재합니다.' });
    }

    const newMember = await db.Member.create({
      PhoneNum: phoneNum,
      Name: name,
      Gender: gender,
      StartTime: startDate,
      EndTime: '2019-09-24',
      TotalPT: totalPT,
      UsedPT: 0,
      Height: height,
      IsRegistered: true,
      TrainerId: req.trainer,
    });
    res.json(newMember);
  } catch (err) {
    console.log(err);
    res.status(500).send('server err');
  }
});

router.get('/getMembers', auth, (req, res) => {
  db.Member.findAll({ where: { TrainerId: req.trainer } })
    .then(foundMember => {
      res.json(foundMember);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('server err');
    });
});

router.post('/removeMember', auth, async (req, res) => {
  const selectedRow = req.body;
  console.log('selectedRow', selectedRow);
  if (selectedRow.length === 1) {
    try {
      const deleteResult = await db.Member.destroy({
        where: { PhoneNum: selectedRow[0].key },
      });
      if (deleteResult) {
        const changedMemberList = await db.Member.findAll({
          where: { TrainerId: req.trainer },
        });
        res.json(changedMemberList);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('server err');
    }
  } else if (selectedRow.length > 1) {
    const keys = selectedRow.map(cv => cv.key);

    try {
      const result = await db.Member.destroy({
        where: { PhoneNum: keys },
      });

      if (result) {
        const changedMemberList = await db.Member.findAll({
          where: { TrainerId: req.trainer },
        });
        res.json(changedMemberList);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('server err');
    }
  }
});

module.exports = router;
