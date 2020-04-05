const path = require('path');
const Sequelize = require('sequelize');
const logger = require('./logger');
const config = require('../config/db')[process.env.NODE_ENV];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
      timestamps: true, // sequelize에서 지원해주는 insert 시간을 자동 update
    },
    timezone: '+09:00',  // UTC + 09:00
    logging: msg => logger.debug(msg),
    dialectOptions: {
      //useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  }
);
module.exports = sequelize;

