const expressLoader = require('./express');
//import dependencyInjectorLoader from './dependencyInjector';
//import mongooseLoader from './mongoose';
//import jobsLoader from './jobs';
const logger = require('./logger');
const sequelize = require('./sequelize');

////We have to import at least all the events once so they can be triggered
//import './events';

module.exports['default'] = async ({ expressApp }) => {
  //const mongoConnection = await mongooseLoader();
  await sequelize
    .sync() // or authenticate()
    .then(result => {
      logger.debug(result.options);
      logger.debug(result.models);
      logger.info('✌️ DB loaded and connected!');
    })
    .catch(err => console.error(err));
  
  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  //const userModel = {
  //  name: 'userModel',
  //  // Notice the require syntax and the '.default'
  //  model: require('../models/user').default,
  //};

  //   // It returns the agenda instance because it's needed in the subsequent loaders
  //   const { agenda } = await dependencyInjectorLoader({
  //     mongoConnection,
  //     models: [
  //       userModel,
  //       // salaryModel,
  //       // whateverModel
  //     ],
  //   });
  //   //Logger.info('✌️ Dependency Injector loaded');

  //await jobsLoader({ agenda });
  //Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  logger.info('✌️ Express loaded');
};
