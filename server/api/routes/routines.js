const middlewares = require('../middlewares');
const routineService = require('../../services/routines');
const { Router } = require('express');

/**
 * @swagger
 * tags:
 *  name: Routine
 *  description: all about routines
 * definitions:
 *  routineSetReq:
 *    type: object
 *    properties:
 *      schedule_id:
 *        type: integer
 *      exerciseCode:
 *        type: integer
 *      routineOrder:
 *        type: integer
 *      member_id:
 *        type: integer
 *      isCadio:
 *        type: integer
 *      cardiotime:
 *        type: string
 *      setCount:
 *        type: integer
 *      repetitions:
 *        type: integer
 *      targetCode:
 *        type: integer
 *      maxWeight:
 *        type: integer
 */
const route = Router();
module.exports = app => {
  app.use('/routines', route);

  /**
   * @swagger
   * /routines:
   *  post:
   *    summary: create or update routines
   *    description: create or update routines
   *    tags: [Routine]
   *    operationId: createRoutine
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: body
   *       name: routines
   *       description: routines infomation
   *       type: array
   *       items:
   *        $ref: '#/definitions/routineSetReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to create member
   */
  route.post('/', middlewares.isAuth, async (req, res, next) => {
    
    const { routines } = req.body;
    console.log(routines);
    
    try {
      await routineService.createOrUpdate(req.body); 
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
    
  });

  /**
   * @swagger
   * /routines/{schedule_id}:
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
   *       name: schedule_id
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
  route.get('/:schedule_id', middlewares.isAuth, async (req, res, next) => {
    try {
      const result = await routineService.getByScheduleId(req.params);
      res.json(result);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /routines:
   *  delete:
   *    summary: delete routine
   *    description: delete routine 
   *    tags: [Routine]
   *    operationId: deleteRoutine
   *    parameters: 
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: query
   *       name: schedule_id
   *       type: integer
   *       required: true
   *     - in: query
   *       name: routineId
   *       type: integer
   *       required: true
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to delete a routine
   */
  route.delete('/', middlewares.isAuth, async (req, res, next) => {
    try {
      await routineService.remove(req.query);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
  })
};
