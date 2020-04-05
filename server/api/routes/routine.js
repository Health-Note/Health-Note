const middlewares = require('../middlewares');
const routineService = require('../../services/routine');
const { Router } = require('express');

const route = Router();

module.exports = app => {
  app.use('/routine', route);

  // @route   POST api/routine/setRoutine
  // @desc    루틴 설정하기
  // @access  Public
  // @req     { exerciseCode, scheduleId, memberId, setCount, repetitions, RoutineOrder }
  route.post('/', middlewares.isAuth, async (req, res, next) => {
    
    const { routines, scheduleId } = req.body;
    
    try {
      await routineService.create(req.body); 
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
    
  });

  route.get('/:scheduleId', middlewares.isAuth, async (req, res, next) => {

    console.log(req.params.scheduleId);
    try {
      const result = await routineService.getByScheduleId(req.params);
      res.json(result);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
};
