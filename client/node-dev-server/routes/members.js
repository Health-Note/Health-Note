const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models/index");
const auth = require("../middleware/auth");

router.post("/insertMember", auth, async (req, res) => {
    console.log("insertMember", req.body);
    const { name, phonenum, gender, start_date, end_date, unusedpt, height } = req.body.formdata;
    try {
        const member = await db.Member.findOne({ where: { phonenum } });
        if (member) {
            return res.status(400).json({ msg: '회원이 이미 존재합니다.' });
        }

        const newMember = await db.Member.create({
            phonenum, 
            name,
            gender, 
            start_date, 
            end_date, 
            unusedpt,
            usedpt: 0,
            height,
            trainer_id: req.trainer,
        })
        res.json(newMember);
    } catch (err) {
        console.log(err);
        res.status(500).send('server err')
    }
});

router.get("/getMembers", auth, (req, res) => {

    db.Member.findAll({where: { trainer_id: req.trainer }})
    .then((foundMember) => {
        res.json(foundMember);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('server err')
    })
})

module.exports = router;