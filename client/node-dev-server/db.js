const Sequelize = require('sequelize');

const sequelize = new Sequelize('health-note', 'jongyeol', 'Whdduf123!', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true
    }
});

module.exports = sequelize;