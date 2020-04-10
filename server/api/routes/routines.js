const middlewares = require('../middlewares');
const routineService = require('../../services/routines');
const { Router } = require('express');


/**
 * @swagger
 * tags:
 *  name: Routine
 *  description: all about routines
 * definitions:
 *  memberSetReq:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      phoneNum:
 *        type: string
 *      gender:
 *        type: integer
 *      totalPT:
 *        type: integer
 *      age:
 *        type: integer
 */
const route = Router();
module.exports = app => {
  app.use('/routines', route);

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

  /**
   * @swagger
   * /routines/{scheduleId}:
   *  get:
   *    summary: get all routines of schedule
   *    description: get all routines of schedule
   *    tags: [Routine]
   *    operationId: getRoutine
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: path
   *       name: scheduleId
   *       type: integer
   *       required: true
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      200:
   *        description: success to get routines
   */
  route.get('/:scheduleId', async (req, res, next) => {
    try {
      const result = await routineService.getByScheduleId(req.params);
      res.json(result);
    } catch (err) {
      return next(err);
    }
  });
};
