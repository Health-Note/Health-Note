const middleware = require('../middlewares');
const memberService = require('../../services/members');
const { Router } = require('express');

/**
 * @swagger
 * tags:
 *  name: Member
 *  description: all about member
 * definitions:
 *  member:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      memberName:
 *        type: string
 *      age:
 *        type: integer
 *      phoneNum:
 *        type: string
 *      gender:
 *        type: integer
 *      totalPT:
 *        type: integer
 *      usedPT:
 *        type: integer
 *      createdAt:
 *        type: string
 *      updatedAt:
 *        type: string
 *      registration:
 *        type: integer
 *      accountId:
 *        type: integer
 *  memberSetReq:
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
   *        description: success to create a member
   */
  route.post('/', middleware.isAuth, async (req, res, next) => {
    try {
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
   *        schema:
   *          type: array
   *          items:
   *           $ref: '#/definitions/member'
   */
  route.get('/', middleware.isAuth, async (req, res, next) => {
    try {
      const result = await memberService.getAll(req.user);
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
    try {
      await memberService.remove(req.query);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }
  });
};
