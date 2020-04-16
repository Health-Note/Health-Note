//import bodyParser from 'body-parser';

const config = require('../config');
const routes =  require('../api');
const logger = require('./logger');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const CustomError = require('../common/error');

const corsOptions = {
  origin: 'http://localhost', // 허락하고자 하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

module.exports = ({ app }) => {
  app.use(helmet());
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

   // The magic package that prevents frontend developers going nuts
   // Alternate description:
   // Enable Cross Origin Resource Sharing to all origins by default
   app.use(cors(corsOptions));

//   // Some sauce that always add since 2014
//   // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
//   // Maybe not needed anymore ?
//   app.use(require('method-override')());

  // to support gzip compress but isn't good into nodejs, use nginx, haproxy or cloud service like real middleware
  //app.use(compression());
//   // Middleware that transforms the raw string of req.body into json
//   app.use(bodyParser.json()); // 최신버전에서는 아래와 같이 사용한다
  app.use(express.json());
  
  // parse application/x-www-form-urlencoded
  //app.use(express.urlencoded({ extended: false }));  
  //app.use(express.static(path.join(__dirname, 'public')));

  // Request object logging
  app.use((req, res, next) => {

    if(Object.keys().length > 0 || req.query.constructor !== Object)
      console.log(req.query);
      
    if(Object.keys().length > 0 || req.body.constructor !== Object)
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

  // if(app.get("env") == "production") 일 경우 detail error msg가 아닌 일반 유저용 msg 필요 
  /// error handlers 
  app.use((err, req, res, next) => {

    if(err instanceof CustomError) {
      console.log(err);
      return res
        .status(err.status)
        .send({ message:err.message })
        .end();
    }
    
    return next(err);
  });
  
  app.use((err, req, res, next) => {
    
    console.log(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

};
