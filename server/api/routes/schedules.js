const middlewares = require('../middlewares');
const scheduleService = require('../../services/schedules');
const memberService = require('../../services/members');
const { Router } = require('express');

/**
 * @swagger
 * tags:
 *  name: Schedule
 *  description: all about schedules
 * definitions:
 *  schedulesOfMember:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     memberName:
 *      type: string
 *     schedules:
 *      type: object
 *      $ref: '#/definitions/schedule'
 *  schedule:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     startTime:
 *      type: string
 *     endTime:
 *      type: string
 *     isFinish:
 *      type: integer
 *     day:
 *      type: integer
 *     tooltipText:
 *      type: string
 *  scheduleInitialReq:
 *    type: object
 *    properties:
 *      memberName:
 *        type: string
 *      phoneNum:
 *        type: string
 *      gender:
 *        type: integer
 *      totalPT:
 *        type: integer
 *      age:
 *        type: integer
 *      startTime:
 *        type: string
 *      days:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            day:
 *              type: integer
 *            hour:
 *              type: integer
 *            min:
 *              type: integer
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
   *        schema:
   *          type: array
   *          items:
   *           $ref: '#/definitions/schedulesOfMember'
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
   *       schema:
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
      //const { id } = await memberService.create(req.body, req.user);
      // 비구조화 할당?? 값만 끄내려면 위와 같이 받아와야 한다
      const { memberId } = await scheduleService.initialize(req.body, req.user);
      res.status(201).json({ memberId });   // 응답 셋팅
    } catch(err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /schedules:
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
   *     - in: query
   *       name: id
   *       type: integer
   *       required: true
   *     - in: query
   *       name: memberId
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
  route.delete('/', middlewares.isAuth, async (req, res, next) => {
    try {
      const deletedId = await scheduleService.remove(req.query);
      res.status(200).json({ deletedId: deletedId });
    } catch(err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /schedules/{scheduleId}:
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
   *     - in: path
   *       name: scheduleId
   *       type: integer
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
  route.patch('/:scheduleId', middlewares.isAuth, async (req, res, next) => {
    try {
      await scheduleService.update(req.body, req.params.scheduleId);
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
   *      201:
   *        description: success to create a schdule
   *        schema:
   *          properties:
   *            id:
   *              type: integer
   */
  route.post('/', middlewares.isAuth, async (req, res, next) => {
    try {
      const id = await scheduleService.create(req.body);
      res.status(201).json(id);
    } catch(err) {
      return next(err);
    }
  });
};
