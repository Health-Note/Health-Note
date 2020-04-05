const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { db } = require('../models');
const config = require('../config');
const logger = require('../loaders/logger');

const get = async user => {
  const account = await db.Account.findOne({
    where: { TrainerId: user },
    attributes: ['TrainerId', 'Email', 'createdAt', 'updatedAt'],
  }).catch(err => {
    throw new Error(err);
  });

  const { dataValues } = account;
  //console.log(dataValues);

  return dataValues;
};

const signin = async body => {
  const { email, password } = body;
  const result = await db.Account.findOne({
    where: { Email: email },
  }).then(async account => {
    
    if (!account) {
      //return res.status(400).json({ msg: '잘못된 정보입니다.' });
      throw new Error('');
    }

    const { dataValues } = account;
    const equal = await bcrypt.compare(password, dataValues.Password);
    if(equal == false) {
      throw new Error('잘못된 패스워드 정보'); // 400
    }

    const payload = {
      trainer: {
        trainerId: dataValues.TrainerId, // 유저 아이디를 권한 인증 및 접근 가능
      },
    };

    // 로그인 성공시 토큰 발행
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 });
    return token;
  })
  
  return result;
};

const signup = async body => {
  logger.info(body);

  const { nickname, email, password } = body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // 생성
  const agreementDate = moment().format('YYYY-MM-DD HH:mm:ss');

  const result = await db.Account.create({
    AgreementVersion: 1,
    AgreementDate: agreementDate,
    Email: email,
    Password: hashedPassword,
  }).then(account => {
    
    const payload = {
      trainer: {
        trainerId: account.dataValues.TrainerId, // 유저 아이디를 권한 인증 및 접근 가능
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 3600000 });
    return token;
  }).catch(err => {
    if(err.name === "SequelizeUniqueConstraintError") 
      throw new Error(err);  // 409
    else 
      throw new Error(err); // 500
  });

  return result;
};

module.exports = { get, signin, signup };
