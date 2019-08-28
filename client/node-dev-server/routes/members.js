const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models/index");

router.post("/insertMembers", (req, res) => {
    db.Trainer.create({
        email: "suam1539@naver.com",
        nickname: "박종열"
    })
});

router.get("/getMembers", (req, res) => {

    db.Member.findAll({

    })
    .then((foundMember) => {

    })
    .catch((err) => {
        console.log(err)
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