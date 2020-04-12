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
 *      trainerName:
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
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
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
      res.json({ user: req.user });
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

      try {
        const token = await authService.signin(req.body);
        res.cookie('user', token, {
          expires: new Date(Date.now() + (1000 * 60 * 5)),
          httpOnly: true
        }).json({ token });
      } catch (err) {
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
      check('trainerName', '이름을 필수값 입니다.')
        .not()
        .isEmpty(),
      check('email', '올바른 이메일 형식을 입력하세요').isEmail(),
      check('password', '6자리 이상 문자를 입력하세요').isLength({ min: 6 }),
    ],
    async (req, res, next) => {
      
      const errors = validationResult(req);
      logger.debug(errors.array());

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const token = await authService.signup(req.body);
        res.status(201).cookie('user', token).json({ token });
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * @swagger
   * /auth/logout:
   *  post:
   *    summary: logout user
   *    description: logout user
   *    tags: [Auth]
   *    operationId: logout
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
   *        description: logout user
   */
  route.post('/logout', middleware.isAuth, async (req, res, next) => {
    // 오로지 토큰으로만 처리되기 때문에 클라이언트 영역에서 토큰을 지워야 한다 서버쪽에 관리하는 체계가 없다 (지금은 쿠키만으로)
    // 마지막 로그인 시간을 기억한다면 DB 업데이트 정도 할 일이 있으나 현재로서는 인증 부분 쿠키만 지운다
    res.clearCookie('user').status(200).end();
  });
};
