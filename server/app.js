// switch 문이 적용되야 config가 인식 됨
const express = require('express');
const config = require('./config');
const logger = require('./loaders/logger');

startServer = async () => {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   * import 가 아닌 require 를 쓴다는 것인 듯
   **/
  await require('./loaders').default({ expressApp: app });

  // config가 가장 먼저 입력이 되어야 한다
  app.listen(config.port, err => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }
    //console.log('client-dev-server (express) started');
    logger.info(`🛡️  Server listening on port: ${config.port}  🛡️`);
  });
};

startServer();
