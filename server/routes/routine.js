const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../models_aws/index');

// @route   POST api/routine/setRoutine
// @desc    루틴 설정하기
// @access  Public
// @req     { exerciseCode, scheduleId, memberId, setCount, reptitions }
router.post('/setRoutine', auth, async (req, res) => {
  console.log(req.body)
  const { exerciseCode, scheduleId, memberId, setCount, reptitions } = req.body;
  try {
   const result = await db.Routine.create({
      ExerciseCode: exerciseCode,
      ScheduleId: scheduleId,
      MemberId: memberId,
      SetCount: setCount,
      Reptitions: reptitions,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
