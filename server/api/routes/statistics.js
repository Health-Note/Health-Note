const { Router } = require('express');
const statisticsService = require('../../services/statistics');

/**
 * @swagger
 * tags:
 *  name: Statistics
 *  description: all about statistics
 */
const route = Router();
module.exports = app => {
  app.use('/statistics', route);

  /**
   * @swagger
   * /statistics:
   *  get:
   *    summary: get statistics
   *    description: get statistics
   *    tags: [Statistics]
   *    operationId: getStatistics
   *    parameters:
   *     - in: header
   *       name: x-auth-token
   *       type: string
   *       required: true
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    responses:
   *      200:
   *        description: success to get statistics
   */
  route.get('/', async (req, res, next) => {
    try {
      const result = await statisticsService.get();
      res.json(result);
    } catch(err) {
      console.log(err)
      // logger.error('error: %o', err);
      return next(err);
    }

  });


};
