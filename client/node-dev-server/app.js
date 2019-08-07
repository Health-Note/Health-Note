const express = require("express");
const app = express();
app.use(express.json());

app.get("/getData", (req, res) => {
    res.json({
         members: [{
            name: "park",
            phoneNum: "01020777538",
            startDay: "20190807",
            startTime: "1600"
        },{
            name: "jong",
            phoneNum: "01094325615",
            startDay: "20190806",
            startTime: "1700"
        },{
            name: "yeol",
            phoneNum: "01097045552",
            startDay: "20190808",
            startTime: "1800"
        }]
    })
})

// 0성공 1실패
app.post("/changeMemberSchedule", (req, res) => {
    console.log(req.body)
    res.json({result: 0})
})

app.post("/deletePT", (req, res) => {
    console.log(req.body)
    res.json({result: 0})
})

app.listen(8080, () => {
    console.log("client-dev-server (express) started")
})
