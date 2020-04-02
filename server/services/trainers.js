const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { db } = require('../models');
const logger = require('../loaders/logger');
const config = require('../config');


const create = (body) => {
    logger.info(body);

    const { nickname, email, password } = body;

    db.Account.findOne({ 
        where: { Email: email } 
    }).then(account => {
        if (account) {
            throw new Error('가입된 이메일이 이미 존재합니다.');
            //   return res
            //     .status(400)
            //     .json({ msg: '가입된 이메일이 이미 존재합니다.' });
        }
        
        try {
            const salt = bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password, salt);
            // 생성
            const agreementDate = moment().format('YYYY-MM-DD HH:mm:ss');
            
            const newAccount = account.create({
                AgreementVersion: 1,
                AgreementDate: agreementDate,
                Email: email,
                Password: hashedPassword,
            }).catch(err => {
                throw new Error(`DB Error : ${err}`);
            });
            
            // // 생성 후 id찾기
            // const foundAccount = await db.Account.findOne({
            //     where: { TrainerId: newAccount.TrainerId },
            // });
            const payload = {
                trainer: {
                    trainerId: newAccount.TrainerId, // 유저 아이디를 권한 인증 및 접근 가능
                },
            };

            jwt.sign(
                payload,
                config.jwtSecret,
                {
                    expiresIn: 3600000,
                },
                (err, token) => {
                    if (err) 
                        throw err;
        
                    return token;
                }
            );
            
        } catch(err) {
            throw err;
        }
    }).catch(err => {
        throw new Error(err);
    });
}

module.exports = { create };