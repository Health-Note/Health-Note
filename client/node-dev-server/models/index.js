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
db.sequelize = sequelize;
module.exports = db;