const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.ENDPOINT,
    port: 3306,
    dialect: process.env.DIALECT,
    define: {
      timestamps: true,   // sequelize에서 지원해주는 insert 시간을 자동 update
    },
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    timezone: '+09:00',
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
