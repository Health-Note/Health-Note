const middleware = require('../middlewares');
const memberService = require('../../services/members');
const { Router } = require('express');

/**
 * @swagger
 * tags:
 *  name: Member
 *  description: all about member
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
  app.use('/members', route);

  /**
   * @swagger
   * /members:
   *  post:
   *    summary: create health member
   *    description: create health member
   *    tags: [Member]
   *    operationId: createMember
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: body
   *       name: user
   *       description: user infomation
   *       schema:
   *         $ref: '#/definitions/memberSetReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to create member
   */
  route.post('/', middleware.isAuth, async (req, res, next) => {
    try {
      console.log("service(create member)", req.body);
      await memberService.create(req.body, req.user);
      res.status(204).end();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /members:
   *  get:
   *    summary: get all member of trainer
   *    description: get all member of trainer
   *    tags: [Member]
   *    operationId: getMember
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
   *        description: success to get members
   */
  route.get('/', middleware.isAuth, async (req, res, next) => {
    try {
      const result = await memberService.getAll(req.user);
      console.log("[service] api/member(get) result", result);
      res.json(result);
    } catch(err) {
      return next(err);
    }
  });

  /**
   * @swagger
   * /members:
   *  delete:
   *    summary: delete member
   *    description: delete member (ids is string but it can parse json array)
   *    tags: [Member]
   *    operationId: deleteMember
   *    parameters: 
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *     - in: query
   *       name: ids
   *       type: string
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to delete members
   */
  route.delete('/', middleware.isAuth, async (req, res, next) => {
    console.log('[routes] delete req.body', req.body.ids);
    const ids = req.body.data;
    try {
      const count = await memberService.remove(req.body.ids);
      res.status(204).json(count);
    } catch(err) {
      return next(err);
    }
  });
};
