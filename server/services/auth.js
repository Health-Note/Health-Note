const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { db } = require('../models');
const config = require('../config');
const logger = require('../loaders/logger');
const CustomError = require('../common/error');

const get = async user => {
  const account = await db.account.findOne({
    where: { trainerId: user },
    attributes: ['trainerId', 'email', 'trainerName' ],
  }).catch(err => {
    throw new Error(err);
  });

  const { dataValues } = account;
  return dataValues;
};

const signin = async body => {
  const { email, password } = body;
  const result = await db.account.findOne({
    where: { email: email },
  }).then(async account => {
    
    if (!account) {
      throw new CustomError('badRequest', 400, '존재하지 않는 계정');
    }

    const { dataValues } = account;
    const equal = await bcrypt.compare(password, dataValues.password);
    if(equal == false) {
      throw new CustomError('badRequest', 400, '잘못된 패스워드 정보'); // 400
    }

    const payload = {
      trainer: {
        trainerId: dataValues.trainerId, // 유저 아이디를 권한 인증 및 접근 가능
      },
    };

    // 로그인 성공시 토큰 발행
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpires });
    return token;
  })
  
  return result;
};

const signup = async body => {
  logger.info(body);

  const { trainerName, email, password, agreementVersion } = body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // 생성
  const agreementDate = moment().format('YYYY-MM-DD HH:mm:ss');
  const initialDate = moment('1900-01-01',"YYYY-MM-DD").format()

  const result = await db.account.create({
    agreementVersion: agreementVersion,
    agreementDate: agreementDate,
    deletedDate: initialDate,
    email: email,
    password: hashedPassword,
    trainerName: trainerName,
    manMemberCount: 0,
    womenMemberCount: 0,
    trainerMemo: '',
  }).then(account => {
    
    const payload = {
      trainer: {
        trainerId: account.dataValues.trainerId, // 유저 아이디를 권한 인증 및 접근 가능
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpires });
    return token;
  }).catch(err => {
    if(err.name === "SequelizeUniqueConstraintError") 
      throw new CustomError('NotUniqueId', 409, err);  // 409
    else 
      throw new Error(err); // 500
  });

  return result;
};

module.exports = { get, signin, signup };
