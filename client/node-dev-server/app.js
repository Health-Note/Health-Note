const express = require("express");
const app = express();
app.use(express.json());

app.get("/getData", (req, res) => {
    res.json({
         members: [{
            name: "park",
            phonenum: "01020777538",
            startDay: "20190807",
            startTime: "1600"
        },{
            name: "jong",
            phonenum: "01094325615",
            startDay: "20190806",
            startTime: "1700"
        },{
            name: "yeol",
            phonenum: "01097045552",
            startDay: "20190808",
            startTime: "1800"
        }]
    })
})

// 0성공 1실패
app.post("/changeMemberSchedule", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
})

app.post("/deletePT", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
})

app.post("/insertRoutine", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
})

app.post("/getWeekRoutineOfStu", (req, res) => {
    console.log(req.body);
})

app.get("/sendBasicsForSchedule", (req, res) => {
    res.json({   
        name: "이서영",
        date: "20190814", // superkey
        phonenum: "01022221111", //superkey
        start_time: "1830", 
        end_time: "1930",
        finish_dncd: true,
        start: "20190815 1930",
    },
    {  
        name: "이서영",
        date: "20190815", // superkey
        phonenum: "01022221111", //superkey
        start_time: "1830", 
        end_time: "1930",
        finish_dncd: false,
        start: "20190814 1330",
    },
    {   
        name: "이서영",
        date: "20190816", // superkey
        phonenum: "01022221111", //superkey
        start_time: "1830", 
        end_time: "1930",
        finish_dncd: false
    },
    { 
        name: "박종열",
        date: "20190816", // superkey
        phonenum: "01033334444", //superkey
        start_time: "1930", 
        end_time: "1830",
        finish_dncd: false,
        start: "20190818 1930",
    },
    { 
        name: "박종열",
        date: "20190815", // superkey
        phonenum: "01033334444", //superkey
        start_time: "1830", 
        end_time: "1930",
        finish_dncd: false,
        start: "20190816 1930",
    },
    {  
        name: "김정권",
        date: "20190816", // superkey
        phonenum: "01044445555", //superkey
        start_time: "1830", 
        end_time: "1930",
        finish_dncd: false,
        start: "20190816 1930",
    })
})

app.listen(8080, () => {
    console.log("client-dev-server (express) started")
})
