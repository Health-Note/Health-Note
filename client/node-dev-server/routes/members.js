const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models/index");
const auth = require("../middleware/auth");

router.post("/insertMember", auth, async (req, res) => {
    console.log("insertMember", req.body);
    const { name, phonenum, gender, start_date, end_date, unusedpt, height } = req.body.formdata;
    try {
        const member = await db.Member.findOne({ where: { phonenum } });
        if (member){
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
        console.log("newMember", newMember)
        res.json(newMember);
    } catch (err) {
        console.log(err);
        res.status(500).send('server err')
    }
});

router.get("/getMembers", auth, (req, res) => {

    db.Member.findAll({where: { trainer_id: req.trainer }})
    .then((foundMember) => {
        console.log("foundMember", foundMember);
        res.json(foundMember);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('server err')
    })

    // res.json({
    //      members: [{
    //         name: "park",
    //         phonenum: "01020777538",
    //         startDay: "20190807",
    //         startTime: "1600"
    //     },{
    //         name: "jong",
    //         phonenum: "01094325615",
    //         startDay: "20190806",
    //         startTime: "1700"
    //     },{
    //         name: "yeol",
    //         phonenum: "01097045552",
    //         startDay: "20190808",
    //         startTime: "1800"
    //     }]
    // })
})

module.exports = router;