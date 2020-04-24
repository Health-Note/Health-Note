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
db['weightTarget'] = sequelize.import(path.join(__dirname, './weightTarget.js'));
db['agreement'] = sequelize.import(path.join(__dirname, './agreement.js'));

// 아래와 같은 관계는 model에서 association에서 할 수도 있다
// db.account.belongsTo(db.agreement, { foreignKey: 'agreementId', targetKey: 'id' });
db.agreement.hasMany(db.account);

// db.schedule.belongsTo(db.member, { foreignKey: 'memberId', targetKey: 'id' });
db.member.hasMany(db.schedule, { foreignKey: 'memberId' });

// db.member.belongsTo(db.account, { foreignKey: 'id' });
db.account.hasMany(db.member, { foreignKey: 'accountId' });

db.member.hasMany(db.biologicalHistory);
db.biologicalHistory.belongsTo(db.member, { foreignKey: 'memberId'});

db.member.hasMany(db.memo);
db.memo.belongsTo(db.member, { foreignKey: 'id' });

//db.exercise.hasMany(db.routine, { foreignKey: 'ExerciseCode' });
db.routine.belongsTo(db.schedule);
db.routine.belongsTo(db.exercise, { foreignKey: 'exerciseId' });
db.routine.hasOne(db.weightTraining, { foreignKey: 'scheduleId' });
db.routine.hasOne(db.weightTraining, { foreignKey: 'exerciseId' });

db.weightTarget.hasMany(db.weightTraining, { foreignKey: 'weightTargetId' });
db.weightTraining.belongsTo(db.routine, { foreignKey: 'scheduleId' });
db.weightTraining.belongsTo(db.routine, { foreignKey: 'exerciseId' });
//db.weightTraining.belongsTo(db.weightTarget, { foreignKey: 'weightTargetId' });

module.exports = { sequelize, db };