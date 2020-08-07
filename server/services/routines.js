const { db, sequelize } = require('../models');

const createOrUpdate = async (body) => {
  console.log(body, "!!!!!!!!!!!!!!!!!!!!!")
  // Routine 과 WeightTraining Table이 분리되어 있기 때문에 비즈니스에서 분기 처리한다
  const cardioArray = [];
  const weightArray = [];
  for (let item of body.updateRoutine) {
    if (item['isCardio'] === 1) {
      cardioArray.push({
        id: item.id,
        scheduleId: body.scheduleId,
        exerciseCode: item.exerciseCode,
        memberId: item.memberId,
        routineOrder: item.routineOrder,
        isCardio: item.isCardio,
        cardioTime: item.cardioTime,
      });
    } else {
      cardioArray.push({
        id: item.id,
        exerciseCode: item.exerciseCode,
        scheduleId: body.scheduleId,
        memberId: item.memberId,
        routineOrder: item.routineOrder,
      });
      weightArray.push({
        routineId: item.id,
        exerciseCode: item.exerciseCode,
        scheduleId: body.scheduleId,
        memberId: item.memberId,
        setCount: item.setCount,
        repetitions: item.repetitions,
        maxWeight: item.maxWeight,
        targetCode: item.targetCode,
      });
    }
  }

  // 아래 단계는 트랜잭션 처리 필수
  const result = await sequelize.transaction(async (t) => {
    await db.routine.bulkCreate(
      cardioArray,
      {
        updateOnDuplicate: ['routineOrder', 'cardioTime'],
      },
      { transaction: t },
    );

    await db.weightTraining.bulkCreate(
      weightArray,
      {
        updateOnDuplicate: ['setCount', 'repetitions', 'maxWeight'],
      },
      { transaction: t }
    );

    if (body.deleteRoutine && body.deleteRoutine.length > 0) {
      await db.weightTraining.destroy(
        {
          where: {
            routineId: body.deleteRoutine,
          },
        },
        { transaction: t }
      );

      await db.routine.destroy(
        {
          where: {
            id: body.deleteRoutine,
          },
        },
        { transaction: t }
      );
    }
  });
};

const getByScheduleId = async (params) => {
  const { scheduleId } = params;

  const result = await db.routine
    .findAll({
      where: { scheduleId: scheduleId },
      include: [{
        model: db.weightTraining
      }, {
        model: db.exercise,
        attributes: ['exerciseName', 'targetName']
      }],
      nest: true,
      row: true
    })

  console.log("routine result", result);

    for(item of result) {
      if(item['isCardio'] === 1) {
        delete item.weightTraining;
      }
    }
  return result;
};

const remove = async (query) => {
  const { scheduleId, exerciseCode, isCardio } = query;

  if (isCardio !== 1 ) {
    await db.weightTraining
    .destroy({
      where: { scheduleId: scheduleId, exerciseCode: exerciseCode },
    })
  }
  
  await db.routine
    .destroy({
      where: { scheduleId: scheduleId, exerciseCode: exerciseCode },
    })
};

module.exports = { createOrUpdate, getByScheduleId, remove };
