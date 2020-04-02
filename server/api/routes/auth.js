const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const middleware = require('../middlewares');
const logger = require('../../loaders/logger');
const authService = require('../../services/auth');

const route = Router();
module.exports = app => {
  app.use('/auth', route);
  // @route   GET api/auth
  // @desc    Get logged in user
  // @access  Private
  route.get(
    '/me',
    middleware.isAuth,
    middleware.attachCurrentUser,
    (req, res, next) => {
      res.json({ user: req.currentUser });
    }
  );

  // @route   POST api/auth
  // @desc    Auth user & get Token
  // @access  Public
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
