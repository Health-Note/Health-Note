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
      await memberService.create(req.body);
      res.staus(204).end();
    } catch (err) {
      //console.log(err);
      //res.status(500).send('server err');
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
   *    parameters: []
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
   *    description: delete member
   *    tags: [Member]
   *    operationId: deleteMember
   *    parameters: []
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      204:
   *        description: success to delete members
   */
  route.delete('/', middleware.isAuth, async (req, res, next) => {
    const selectedRow = req.body;
    console.log('selectedRow', selectedRow);
    
    try {
      await memberService.remove(req.body);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }

  });
};
