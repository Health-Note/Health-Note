const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models/index');
const auth = require('../middleware/auth');

router.post('/insertMember', auth, async (req, res) => {
  const {
    name,
    phonenum,
    gender,
    startDate,
    end_date,
    unusedpt,
    height,
  } = req.body;
  try {
    const member = await db.Member.findOne({ where: { phonenum } });
    if (member) {
      return res.status(400).json({ msg: '회원이 이미 존재합니다.' });
    }

    const newMember = await db.Member.create({
      phonenum,
      name,
      gender,
      start_date: startDate,
      end_date: null,
      unusedpt,
      usedpt: 0,
      height,
      trainer_id: req.trainer,
    });
    res.json(newMember);
  } catch (err) {
    console.log(err);
    res.status(500).send('server err');
  }
});

router.get('/getMembers', auth, (req, res) => {
  db.Member.findAll({ where: { trainer_id: req.trainer } })
    .then(foundMember => {
      res.json(foundMember);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('server err');
    });
});

router.post('/removeMember', auth, (req, res) => {
  const selectedRow = req.body;
  console.log(selectedRow);
  if (selectedRow.length === 1) {
    db.Member.destroy({
      where: { phonenum: selectedRow[0].key },
    })
      .then(foundMember => {
        res.json(foundMember);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('server err');
      });
  } else if (selectedRow.length > 1) {
    const keys = selectedRow.map(cv => cv.key);
    db.Member.destroy({
      where: { phonenum: keys },
    })
      .then(foundMember => {
        res.json(foundMember);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('server err');
      });
  }
});

module.exports = router;
