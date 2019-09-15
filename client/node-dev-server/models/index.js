const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('health_note', 'jongyeol', 'Whdduf123!', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true
    }
});
const db = {};


db['Member'] = sequelize.import(path.join(__dirname, 'members.js'));
db['Trainer'] = sequelize.import(path.join(__dirname, 'trainer.js'));
db['Schedule'] = sequelize.import(path.join(__dirname, 'schedule.js'));
db.sequelize = sequelize;

db.Schedule.belongsTo(db.Member, { foreignKey: "phonenum" });
db.Member.belongsTo(db.Trainer, { foreignKey: "trainer_id" })
db.Member.hasMany(db.Schedule, { foreignKey: "phonenum" });
db.Trainer.hasMany(db.Member, {foreignKey: "trainer_id"});

module.exports = db;