require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());

// routes
const memberRoutes = require("./routes/members");
const trainerRoutes = require("./routes/trainers");
const authRoutes = require("./routes/auth");
const fixedScheduleRoutes = require("./routes/fixedSchedules");
const scheduleRoutes = require("./routes/schedules");

app.use("/api/trainers", trainerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/fixedSchedules", fixedScheduleRoutes);
app.use("/api/schedules", scheduleRoutes);

// 0성공 1실패
app.post("/changeMemberSchedule", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
});

app.post("/deletePT", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
});

app.get("/getAllExercise", (req, res) => {
    console.log("getAllExercise", req.body)
    res.json([{
        category: "가슴",
        kind: ["벤치프레스", "팩덱플라이", "덤벨플라이"]
    }, {
        category: "등",
        kind: ["턱걸이", "바벨로우", "렛풀다운", ]
    }, {
        category: "하체",
        kind: ["스쿼트", "프론트스쿼트", "런지", ]
    },{
        category: "어깨",
        kind: ["밀리터리프레스", "덤벨프레스", "사이드레터럴라이즈"]
    },{
        category: "삼두",
        kind: ["푸쉬업", "", "", ]
    },{
        category: "이두",
        kind: ["덤벨암", "바벨암", "케이블암", ]
    },{
        category: "유산소",
        kind: ["러닝", "바이크", "스테퍼", ]
    }])
})

app.post("/insertRoutine", (req, res) => {
    console.log(req.body);
    res.json({result: 0});
})

app.post("/getWeekRoutineOfStu", (req, res) => {
    res.json( {
        name: "park",
        week: [
            { day: 0, dayRoutines: ["벤치프레스", "풀업", "러닝", "윗몸일으키기", "풀업", "러닝", "윗몸일으키기"] },
            { day: 1, dayRoutines: ["덤벨컬", "풀업", "러닝", "윗몸일으키기"] },
            { day: 2, dayRoutines: ["바벨컬", "풀업", "러닝", "윗몸일으키기"] },
            { day: 3, dayRoutines: ["펙덱플라이4", "풀업", "러닝", "윗몸일으키기"] },
            { day: 4, dayRoutines: ["펙덱플라이5", "풀업", "러닝", "윗몸일으키기"] },
            { day: 5, dayRoutines: ["펙덱플라이6", "풀업", "러닝", "윗몸일으키기"] },
            { day: 6, dayRoutines: ["펙덱플라이7", "풀업", "러닝", "윗몸일으키기"] }
        ]
    })
})

app.get("/sendBasicsForSchedule", (req, res) => {
   
})

app.listen(8080, () => {
    console.log("client-dev-server (express) started")
})
