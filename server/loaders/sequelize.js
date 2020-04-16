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
    pool: {
      max: 10,
      min: 0,
      idle: 100000
    },
    define: {
      timestamps: true, // sequelize에서 지원해주는 insert 시간을 자동 update
      underscored: false, // support Oracle convention type 
      freezeTableName: true, // define method의 첫 번째 파라미터를 복수형의 tablename(user -> users)으로 자동 변환하는데, 이 옵션의 값이 true이면 변환 작업을 하지 않도록 합니다.
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    timezone: '+09:00',  // UTC + 09:00
    logging: msg => logger.debug(msg),
    // https://www.npmjs.com/package/mysql#connection-options mysql 옵션
    dialectOptions: {
      //useUTC: false, //for reading from database (mssql option?)
      dateStrings: true,  // Date 객체로 바꾸지 않고 문자열로 처리한다는 옵션 (날짜연산 할 일이 없다면?)
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

