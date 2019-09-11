const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models/index");
const auth = require("../middleware/auth");
const moment = require('moment');
const schedulesController = require('../controller/schedulesController');
    // 월, 수, 금
    // ========== 시작 요일
    //     11, 13
    // 16, 
    //=========== 중간 요일
    //     18, 20
    // 23, 25, 27
    // ========== 남은 요일
    // 30, 2  
router.post("/setSchedule", auth, schedulesController.setSchedule);

router.get("/getAllSchedules", auth, async (req, res) => {

})

module.exports = router;
