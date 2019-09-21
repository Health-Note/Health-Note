const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models/index');

router.post('/insertTrainer', (req, res) => {
  db.Trainer.create({
    email: 'suam1539@naver.com',
    nickname: '트레이너',
  });
});

router.get('/getMembers', (req, res) => {
  db.Member.findAll({})
    .then(foundMember => {})
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
