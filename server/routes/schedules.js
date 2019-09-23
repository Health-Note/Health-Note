const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
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
router.post('/setSchedule', auth, schedulesController.setSchedule);

router.get('/getAllSchedules', auth, schedulesController.getSchedule);

module.exports = router;
