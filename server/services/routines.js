const { db } = require('../models');

const create = async body => {
  const { routines, scheduleId } = body;

  //???
  if (routines.length === 0) {
    await db.Routine.destroy({
      where: { ScheduleId: scheduleId },
    })
      .catch(err => {
        throw new Error(err);
      });
  }

  await db.Routine.destroy({
    where: { ScheduleId: routines[0].ScheduleId },
  })
    .then(async result => {

      await db.Routine.bulkCreate(routines, {
        updateOnDuplicate: ['SetCount', 'Repetitions', 'RoutineOrder'],
      })

    })
    .catch(err => {
    throw new Error(err);
  });

  
};

const getByScheduleId = async params => {

  const result = await db.Routine.findAll({
    where: { ScheduleId: params.scheduleId },
    include: { model: db.Exercise },
  }).then(result => {

    const routines = result.dataValues.map(cv => ({
        exerciseCode: cv.ExerciseCode,
        scheduleId: cv.ScheduleId,
        memberId: cv.MemberId,
        exerciseName: cv.Exercise.ExerciseName,
        target: cv.Exercise.Target,
        setCount: cv.SetCount,
        repetitions: cv.Repetitions,
        routineOrder: cv.RoutineOrder,
      }));

      return routines;    
  }).catch(err => {
      throw new Error(err);
  });

  return result;
};

module.exports = { create, getByScheduleId };
