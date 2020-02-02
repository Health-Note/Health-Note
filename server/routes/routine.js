const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../models');

// @route   POST api/routine/setRoutine
// @desc    루틴 설정하기
// @access  Public
// @req     { exerciseCode, scheduleId, memberId, setCount, repetitions, RoutineOrder }
router.post('/', auth, async (req, res) => {
  const { routines, scheduleId } = req.body;
  console.log(routines);
  if (routines.length === 0) {
    try {
      const deletedResult = await db.Routine.destroy({
        where: { ScheduleId: scheduleId },
      });
      return res.json(deletedResult);
    } catch (err) {
      console.log(err);
      res.status(500).send('server err');
    }
  }
  try {
    await db.Routine.destroy({
      where: { ScheduleId: routines[0].ScheduleId },
    });
    const result = await db.Routine.bulkCreate(routines, {
      updateOnDuplicate: ['SetCount', 'Repetitions', 'RoutineOrder'],
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:scheduleId', auth, async (req, res) => {
  console.log(req.params.scheduleId);
  try {
    const foundRoutines = await db.Routine.findAll({
      where: { ScheduleId: req.params.scheduleId },
      include: { model: db.Exercise },
    });

    const routines = foundRoutines.map(cv => ({
      exerciseCode: cv.ExerciseCode,
      scheduleId: cv.ScheduleId,
      memberId: cv.MemberId,
      exerciseName: cv.Exercise.ExerciseName,
      target: cv.Exercise.Target,
      setCount: cv.SetCount,
      repetitions: cv.Repetitions,
      routineOrder: cv.RoutineOrder,
    }));
    res.json(routines);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
