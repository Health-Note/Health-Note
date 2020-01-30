const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');


router.get('/', async () => {
  console.log("옴");
  // const { memberId } = req.body;
  const result = await db.Routine.findAndCountAll({
    where: {
      MemberId: 21,
      ExerciseCode: {
        [Op.between]: [100, 199]
      },
    },
  });
  console.dir(result);
});

module.exports = router;

// 가슴
// 등
