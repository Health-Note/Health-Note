const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const middleware = require('../middlewares');
const logger = require('../../loaders/logger');
const authService = require('../../services/auth');

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: all about auth
 * definitions:
 *  account:
 *    type: object
 *    required:
 *      - trainerId
 *    properties:
 *      trainerId:
 *        type: integer
 *      email:
 *        type: string
 *      createdAt:
 *        type: string
 *      updatedAt:
 *        type: string
 *  signupReq:
 *    type: object
 *    required:
 *      - email
 *      - password
 *      - trainerName
 *      - agreementVersion
 *    properties:
 *      trainerName:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      agreementVersion:
 *        type: integer
 */
const route = Router();
module.exports = app => {
  app.use('/auth', route);
  
  /**
   * @swagger
   * /auth/me:
   *  get:
   *    summary: get current user
   *    description: identify current user
   *    tags: [Auth]
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: OK
   *        schema:
   *          type: object
   *          $ref: '#/definitions/account'
   */
  route.get(
    '/me',
    middleware.isAuth,
    middleware.attachCurrentUser,
    async (req, res, next) => {
      res.json({ user: req.currentUser });
    }
  );

  /**
   * @swagger
   * /auth/signin:
   *  post:
   *    summary: signin user
   *    description: signin user
   *    tags: [Auth]
   *    operationId: signin
   *    parameters:
   *     - in: body
   *       name: user
   *       description: user infomation
   *       schema:
   *         type: object
   *         required:
   *           - email
   *           - password
   *         properties:
   *           email:
   *            type: string
   *           password:
   *            type: string
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      200:
   *        description: success to get access token
   *        schema:
   *          properties:
   *            token:
   *              type: string
   */
  route.post(
    '/signin',
    [
      check('email', '이메일 형식을 입력하세요').isEmail(),
      check('password', '패스워드를 입력하세요').exists(), // exists괄호 안에 커스텀 가능
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      logger.info('로그인: %o', req.body);

      try {
        const token = await authService.signin(req.body);
        res.json({ token });
      } catch (err) {
        //logger.error(err);
        console.log(err);
        //console.error(err);
        //res.status(500).send('server err');
        return next(err);
      }
    }
  );

  /**
   * @swagger
   * /auth/signup:
   *  post:
   *    summary: signup user
   *    description: signup user
   *    tags: [Auth]
   *    operationId: signup
   *    parameters:
   *     - in: body
   *       name: user
   *       description: user infomation
   *       schema:
   *         $ref: '#/definitions/signupReq'
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      200:
   *        description: success to get access token
   *        schema:
   *          properties:
   *            token:
   *              type: string
   */
  route.post(
    '/signup',
    [
      check('nickname', '이름을 필수값 입니다.')
        .not()
        .isEmpty(),
      check('email', '올바른 이메일 형식을 입력하세요').isEmail(),
      check('password', '6자리 이상 문자를 입력하세요').isLength({ min: 6 }),
    ],
    async (req, res, next) => {
      logger.debug(req.body);
      const errors = validationResult(req);
      logger.debug(errors.array());

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nickname, email, password } = req.body;

      try {
        const token = await authService.signup(req.body);
        res.status(201).json({ token });
      } catch (err) {
        //logger.error('error: %o', err);
        return next(err);
        //res.status(500).send('server err');
      }
    }
  );

  route.post('/logout', middleware.isAuth, async (req, res, next) => {
    return res.json({});
  });
};
