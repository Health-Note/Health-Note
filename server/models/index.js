const path = require('path');
const sequelize = require('../loaders/sequelize');

const db = {};
//db.sequelize = sequelize;

// 파일을 하나씩 캐싱하는 방식
db['member'] = sequelize.import(path.join(__dirname, './member.js'));
db['account'] = sequelize.import(path.join(__dirname, './account.js'));
db['schedule'] = sequelize.import(path.join(__dirname, './schedule.js'));
db['routine'] = sequelize.import(path.join(__dirname, './routine.js'));
db['exercise'] = sequelize.import(path.join(__dirname, './exercise.js'));
db['biologicalHistory'] = sequelize.import(path.join(__dirname, './biologicalHistory.js'));
db['memo'] = sequelize.import(path.join(__dirname, './memo.js'));
db['weightTraining'] = sequelize.import(path.join(__dirname, './weightTraining.js'));
db['agreement'] = sequelize.import(path.join(__dirname, './agreement.js'));

// 아래와 같은 관계는 model에서 association에서 할 수도 있다
db.agreement.hasMany(db.account, { foreignKey: 'agreementId' });

db.account.hasMany(db.member, { foreignKey: 'accountId' });

db.member.hasMany(db.schedule, { foreignKey: 'memberId' });

db.biologicalHistory.belongsTo(db.member, { foreignKey: 'id'});

db.memo.belongsTo(db.member, { foreignKey: 'id' });

db.schedule.hasMany(db.routine, { foreignKey: 'scheduleId' })

db.routine.belongsTo(db.exercise, { foreignKey: 'exerciseCode' });
db.routine.hasOne(db.weightTraining, { foreignKey: 'scheduleId' });
db.routine.hasOne(db.weightTraining, { foreignKey: 'exerciseCode' });

db.exercise.hasMany(db.weightTraining, { foreignKey: 'targetCode' })
db.weightTraining.belongsTo(db.routine, { foreignKey: 'memberId' })
db.weightTraining.belongsTo(db.routine, { foreignKey: 'scheduleId' });
db.weightTraining.belongsTo(db.routine, { foreignKey: 'exerciseCode' });

module.exports = { sequelize, db };