const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const db = require('../models');
const moment = require('moment')
// @route   POST api/trainers
// @desc    유저등록
// @access  Public
router.post(
  '/',
  [
    check('nickname', '이름을 필수값 입니다.')
      .not()
      .isEmpty(),
    check('email', '올바른 이메일 형식을 입력하세요').isEmail(),
    check('password', '6자리 이상 문자를 입력하세요').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('req.body', req.body);
    const errors = validationResult(req);
    console.log("error", errors.array())
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nickname, email, password } = req.body;

    try {
      const account = await db.Account.findOne({ where: { Email: email } });

      if (account) {
        return res.status(400).json({ msg: '가입된 이메일이 이미 존재합니다.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 생성
      const agreementDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const newAccount = await db.Account.create({
        AgreementVersion: 1,
        AgreementDate: agreementDate,
        Email: email,
        Password: hashedPassword,
      });

      // 생성 후 id찾기
      const foundAccount = await db.Account.findOne({
        where: { TrainerId: newAccount.TrainerId },
      });

      const payload = {
        trainer: {
          trainerId: foundAccount.TrainerId, // 유저 아이디를 권한 인증 및 접근 가능
        },
      };

      jwt.sign(
        payload,
        'jwtSecret',
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('server err');
    }
  }
);

module.exports = router;
