const express = require('express');
const middlewares = require('../middlewares');
const schedulesController = require('../../services/schedulesController');
// 월, 수, 금
// ========== 시작 요일
//     11, 13
// 16,
//=========== 중간 요일
//     18, 20
// 23, 25, 27
// ========== 남은 요일
// 30, 2

const route = express.Router({ mergeParams: true });

module.exports = app => {
  app.use('/schedules', route);

  route.post('/setSchedule', middlewares.isAuth, schedulesController.setSchedule);

  route.get('/getAllSchedules', middlewares.isAuth, schedulesController.getSchedule);

  route.post('/removeSchedule', middlewares.isAuth, schedulesController.removeSchedule);

  route.post('/changeSchedule', middlewares.isAuth, schedulesController.changeSchedule);

  route.post('/createOneSchedule', middlewares.isAuth, schedulesController.createOneSchedule);
};
