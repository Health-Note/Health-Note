const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();

// DB 설정
switch (process.env.NODE_ENV) {
  case 'aws':
    dotenv.config({ path: path.join(__dirname, '/.env.aws') });
    console.log('start aws db connection');
    break;
  case 'local':
    dotenv.config({ path: path.join(__dirname, '/.env.local') });
    console.log('start local db connection');
    break;
  default:
    //throw new Error('process.env.NODE_ENV no setting');
    console.log('process.env.NODE_ENV no setting then will start aws connection setting!');
    dotenv.config({ path: path.join(__dirname, '/.env.aws') });
    break;
}

// 라우트
const memberRoutes = require('./routes/members');
const trainerRoutes = require('./routes/trainers');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedules');
const routineRoutes = require('./routes/routine');
const exerciseRoutes = require('./routes/exercises');
const statisticsRoutes = require('./routes/statistics');

// 미들웨어
app.use(express.json());
app.use('/api/trainers', trainerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/statistics', statisticsRoutes);

app.listen(8080, () => {
  console.log('client-dev-server (express) started');
});
