const { db } = require('../models');

const create = async body => {
  const { routines, scheduleId } = body;

  //???
  if (routines.length === 0) {
    await db.routine.destroy({
      where: { ScheduleId: scheduleId },
    })
      .catch(err => {
        throw new Error(err);
      });
  }

  await db.routine.destroy({
    where: { ScheduleId: routines[0].ScheduleId },
  })
    .then(async result => {

      await db.routine.bulkCreate(routines, {
        updateOnDuplicate: ['SetCount', 'Repetitions', 'RoutineOrder'],
      })

    })
    .catch(err => {
    throw new Error(err);
  });

  
};

const getByScheduleId = async params => {

  const { scheduleId } = params;

  const result = await db.routine.findAll({
    where: { scheduleId: scheduleId },
    //include: { model: db.exercise }, 
    raw: true, nest: true
  }).catch(err => {
      throw new Error(err);
  });

  return result;
};

module.exports = { create, getByScheduleId };
