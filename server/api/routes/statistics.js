const { Router } = require('express');
const statisticsService = require('../../services/statistics');

const route = Router();
module.exports = app => {
  app.use('/statistics', route);

  route.get('/', async (req, res, next) => {

    try {
      const result = await statisticsService.get();
      res.json(result);
    } catch(err) {
      logger.error('error: %o', err);
      return next(err);
    }

  });
};

// 가슴
// 등
