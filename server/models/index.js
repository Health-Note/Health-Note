const path = require('path');
const sequelize = require('../loaders/sequelize');

const db = {};
//db.sequelize = sequelize;

db['Member'] = sequelize.import(path.join(__dirname, './member.js'));
db['Account'] = sequelize.import(path.join(__dirname, './account.js'));
db['Trainer'] = sequelize.import(path.join(__dirname, './trainer.js'));
db['Schedule'] = sequelize.import(path.join(__dirname, './schedule.js'));
db['Routine'] = sequelize.import(path.join(__dirname, './routine.js'));
db['Exercise'] = sequelize.import(path.join(__dirname, './exercise.js'));

db.Schedule.belongsTo(db.Member, { foreignKey: 'MemberId' });
db.Member.hasMany(db.Schedule, { foreignKey: 'MemberId' });

db.Member.belongsTo(db.Account, { foreignKey: 'trainerId' });
db.Account.hasMany(db.Member, { foreignKey: 'trainerId' });

db.Routine.belongsTo(db.Exercise, { foreignKey: 'ExerciseCode' });
db.Exercise.hasMany(db.Routine, { foreignKey: 'ExerciseCode' });

module.exports = { sequelize, db };

