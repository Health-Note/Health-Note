const { db } = require('../models');

const createOrUpdate = async (body) => {
  // Routine 과 WeightTraining Table이 분리되어 있기 때문에 비즈니스에서 분기 처리한다
  const cardioArray = [];
  const weightArray = [];
  for (let item of body) {
    if (item['isCardio'] === 1) {
      cardioArray.push({
        scheduleId: item.scheduleId,
        exerciseId: item.exerciseId,
        memberId: item.memberId,
        routineOrder: item.routineOrder,
        isCardio: item.isCardio,
        cardioTime: item.cardioTime,
      });
    } else {
      cardioArray.push({
        scheduleId: item.scheduleId,
        exerciseId: item.exerciseId,
        memberId: item.memberId,
        routineOrder: item.routineOrder,
      });
      weightArray.push({
        scheduleId: item.scheduleId,
        exerciseId: item.exerciseId,
        setCount: item.setCount,
        repetitions: item.repetitions,
        maxWeight: item.maxWeight,
        weightTargetId: item.weightTargetId,
      });
    }
  }

  await db.routine
    .bulkCreate(cardioArray, {
      updateOnDuplicate: ['routineOrder', 'cardioTime'],
    })

  await db.weightTraining
    .bulkCreate(weightArray, {
      updateOnDuplicate: ['setCount', 'repetitions', 'maxWeight'],
    })
};

const getByScheduleId = async (params) => {
  const { scheduleId } = params;

  const result = await db.routine
    .findAll({
      where: { scheduleId: scheduleId },
      include: { model: db.weightTraining, required: false },
      raw: true,
      nest: true
    })

    for(item of result) {
      console.log(item);
      if(item['isCardio'] === 1) {
        delete item.weightTraining;
      }
    }
  return result;
};

const remove = async (query) => {
  const { scheduleId, exerciseId, isCardio } = query;

  await db.routine
    .destroy({
      where: { scheduleId: scheduleId, exerciseId: exerciseId },
    })

  if(isCardio != 1 ) {
    await db.weightTraining
    .destroy({
      where: { scheduleId: scheduleId, exerciseId: exerciseId },
    })
  }
  
};

module.exports = { createOrUpdate, getByScheduleId, remove };
