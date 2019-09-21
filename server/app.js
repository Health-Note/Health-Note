require('dotenv').config();
const express = require('express');
const app = express();

// 라우트
const memberRoutes = require('./routes/members');
const trainerRoutes = require('./routes/trainers');
const authRoutes = require('./routes/auth');
const fixedScheduleRoutes = require('./routes/fixedSchedules');
const scheduleRoutes = require('./routes/schedules');
const routineRoutes = require('./routes/routine');

// 미들웨어
app.use(express.json());
app.use('/api/trainers', trainerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/fixedSchedules', fixedScheduleRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/routine', routineRoutes);

app.listen(8080, () => {
  console.log('client-dev-server (express) started');
});
