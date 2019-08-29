const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const db = require("../models/index");

// @route   POST api/trainers
// @desc    유저등록
// @access  Public
router.post("/", [
        check('nickname', "이름을 필수값 입니다.").not().isEmpty(),
        check("email", "올바른 이메일 형식을 입력하세요").isEmail(),
        check("password", "6자리 이상 문자를 입력하세요").isLength({min: 6})
    ], async(req, res) => {
        console.log("req.body", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nickname, email, password } = req.body;
    
    try { 
        const trainer = await db.Trainer.findOne({ where: { email: email } })
        
        if (trainer) {
            return res.status(400).json({ msg: '유저가 이미 존재합니다.' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const payload = {
            trainer: {
                id: email // 유저 아이디를 권한 인증 및 접근 가능
            }
        };

        const newTrainer = await db.Trainer.create({ nickname, email, password: hashedPassword });
        console.log("newTrainer", newTrainer);
        
        jwt.sign(payload, 'jwtSecret', {
            expiresIn: 3600000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token })
        });
    } catch(err) {
        console.log(err);
        res.status(500).send('server err')
    }

});

module.exports = router;