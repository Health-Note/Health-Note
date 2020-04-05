//import bodyParser from 'body-parser';
//import cors from 'cors';

const config = require('../config');
const routes =  require('../api');
const logger = require('./logger');
const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const CustomError = require('../common/error');

module.exports = ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

//   // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
//   // It shows the real origin IP in the heroku or Cloudwatch logs
//   app.enable('trust proxy');

//   // The magic package that prevents frontend developers going nuts
//   // Alternate description:
//   // Enable Cross Origin Resource Sharing to all origins by default
//   app.use(cors());

//   // Some sauce that always add since 2014
//   // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
//   // Maybe not needed anymore ?
//   app.use(require('method-override')());


//   // Middleware that transforms the raw string of req.body into json
//   app.use(bodyParser.json()); // 최신버전에서는 아래와 같이 사용한다
  app.use(express.json());
  //app.use(express.urlencoded({ extended: false }));
  //app.use(express.static(path.join(__dirname, 'public')));

  // Request object logging
  app.use((req, res, next) => {
    console.log(req.query);

    console.log(req.params);

    console.log(req.body);

    next();
  });

  // 로깅
  // https://stackoverflow.com/questions/42009672/nodejs-how-to-use-morgan-with-debug
  app.use(morgan('dev', { stream: { write: msg => logger.info(msg) } }));
  
  // Load API routes
  app.use(config.api.prefix, routes());

  // Swagger UI set up
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {

    if(err instanceof CustomError) {
      return res
        .status(err.status)
        .send({ message:err.message })
        .end();
    }
    
    return next(err);
  });
  
  app.use((err, req, res, next) => {
    
    //console.log("여기서하자2");
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

};
