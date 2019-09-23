const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('healthnote', 'jongyeol', 'Whdduf123!', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: true,
  },
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
      },
  },
  timezone: '+09:00'
});
const db = {};

db['Member'] = sequelize.import(path.join(__dirname, 'member.js'));
db['Account'] = sequelize.import(path.join(__dirname, 'account.js'));
db['Trainer'] = sequelize.import(path.join(__dirname, 'trainer.js'));
db['Schedule'] = sequelize.import(path.join(__dirname, 'schedule.js'));
db['Routine'] = sequelize.import(path.join(__dirname, 'routine.js'));
db.sequelize = sequelize;

db.Schedule.belongsTo(db.Member, { foreignKey: 'MemberId' });
db.Member.belongsTo(db.Account, { foreignKey: 'TrainerId' });
db.Member.hasMany(db.Schedule, { foreignKey: 'MemberId' });
db.Account.hasMany(db.Member, { foreignKey: 'TrainerId' });

module.exports = db;
