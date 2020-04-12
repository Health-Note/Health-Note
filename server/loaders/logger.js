const winston = require('winston');
const config = require('../config');
require('winston-daily-rotate-file');
require('date-utils');

const transports = [];

const myFormat = winston.format.printf(
    // date-utils
    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`
)

if(process.env.NODE_ENV === 'production') {
    // winston-daily-ratate-file
    transports.push(
        new winston.transports.DailyRotateFile({
            filename: `../logs/app.log`,
            zippedArchive: false,
            format: myFormat,
            handleExceptions: true,
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            //format: winston.format.combine(
                //winston.format.cli(),
                //winston.format.splat(),
                //winston.format.errors({ stack: true }),
                //winston.format.json(),
                //winston.format.prettyPrint()
            //),
            handleExceptions: true,
            colorize: true,
        })
    );
    // transports.push(
    //     new winston.transports.DailyRotateFile({
    //         filename: `../logs/app.log`,
    //         zippedArchive: false,
    //         format: myFormat,
    //         handleExceptions: true,
    //     })
    // );
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.cli()
    ),
    transports
})

module.exports = LoggerInstance; 