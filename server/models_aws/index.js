const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'healthnote',
  process.env.AWS_user,
  process.env.AWS_password,
  {
    host: process.env.AWS_endpoint,
    dialect: 'mysql',
    define: {
      timestamps: true,
    },
  } 
);
const db = {};

db['Member'] = sequelize.import(path.join(__dirname, 'Member.js'));
db['Account'] = sequelize.import(path.join(__dirname, 'Account.js'));
db['Trainer'] = sequelize.import(path.join(__dirname, 'Trainer.js'));
db['Schedule'] = sequelize.import(path.join(__dirname, 'Schedule.js'));
db['Routine'] = sequelize.import(path.join(__dirname, 'Routine.js'));
db['Exercise'] = sequelize.import(path.join(__dirname, 'Exercise.js'));
db.sequelize = sequelize;

db.Schedule.belongsTo(db.Member, { foreignKey: 'MemberId' });
db.Member.hasMany(db.Schedule, { foreignKey: 'MemberId' });

db.Member.belongsTo(db.Account, { foreignKey: 'TrainerId' });
db.Account.hasMany(db.Member, { foreignKey: 'TrainerId' });

db.Routine.belongsTo(db.Exercise, { foreignKey: 'ExerciseCode' });
db.Exercise.hasMany(db.Routine, { foreignKey: 'ExerciseCode' });


module.exports = db;
