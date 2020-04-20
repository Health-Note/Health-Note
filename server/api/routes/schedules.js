const middlewares = require('../middlewares');
const scheduleService = require('../../services/schedules');
const { Router } = require('express');
// 월, 수, 금
// ========== 시작 요일
//     11, 13
// 16,
//=========== 중간 요일
//     18, 20
// 23, 25, 27
// ========== 남은 요일
// 30, 2


/**
 * @swagger
 * tags:
 *  name: Schedule
 *  description: all about schedules
 * definitions:
 *  scheduleInitialReq:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      startTime:
 *        type: string
 *      endTime:
 *        type: string
 *      day:
 *        type: integer
 *  scheduleSetReq:
 *    type: object
 *    properties:
 *      memberId:
 *        type: integer
 *      startTime:
 *        type: string
 *      endTime:
 *        type: string
 *      isFinish:
 *        type: integer
 *      isReschedule:
 *        type: integer
 *      day:
 *        type: integer
 *      tooltipText:
 *        type: string
 */
const route = Router();
module.exports = app => {
  app.use('/schedules', route);

  /**
   * @swagger
   * /schedules:
   *  get:
   *    summary: get all schedules of members
   *    description: get all schedules of members
   *    tags: [Schedule]
   *    operationId: getSchedule
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      200:
   *        description: success to get all schedules of members
   */
  route.get('/', middlewares.isAuth, async (req, res, next) => {
    try {
      const result = await scheduleService.get(req.user);
      res.json(result);
    } catch(err) {
      return next(err);
    };
  });

  /**
   * @swagger
   * /schedules/initializing:
   *  post:
   *    summary: create schedules on initialization
   *    description: create schedules on initialization
   *    tags: [Schedule]
   *    operationId: initailizeSchedule
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: body
   *       name: schedules
   *       description: schedule infomation
   *       type: array
   *       items:
   *        $ref: '#/definitions/scheduleInitialReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to create schedule
   */  
  route.post('/initializing', middlewares.isAuth, async (req, res, next) => {
    try {
      const result = await scheduleService.initialize(req.body);
      //res.status(204).json(result);
    } catch(err) {
      throw next(err);
    }
  });

  /**
   * @swagger
   * /schedules/{id}:
   *  delete:
   *    summary: delete schedule
   *    description: delete schedule 
   *    tags: [Schedule]
   *    operationId: deleteSchedule
   *    parameters: 
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: path
   *       name: id
   *       type: integer
   *       required: true
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to delete a schedule
   */
  route.delete('/:id', middlewares.isAuth, async (req, res, next) => {
    try {
      await scheduleService.remove(req.params.scheduleId);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /schedules/{id}:
   *  patch:
   *    summary: update a schedule
   *    description: update a schedule
   *    tags: [Schedule]
   *    operationId: updateSchedule
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: body
   *       name: schedule
   *       description: schedule infomation
   *       schema:
   *        $ref: '#/definitions/scheduleSetReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to update a schedule
   */
  route.patch('/:id', middlewares.isAuth, async (req, res, next) => {
    try {
      await scheduleService.update(req.body, req.params.scheduldId);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /schedules:
   *  post:
   *    summary: create a schedule
   *    description: create a schedule
   *    tags: [Schedule]
   *    operationId: createSchedule
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: body
   *       name: schedule
   *       description: schedule infomation
   *       schema:
   *        $ref: '#/definitions/scheduleSetReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to create a schdule
   */
  route.post('/', middlewares.isAuth, async (req, res, next) => {
    try {
      await scheduleService.create(req.body);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
  });
};
