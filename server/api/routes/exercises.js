const { Router } = require('express');
const exerciseService = require('../../services/exercises');

/**
 * @swagger
 * tags:
 *  name: Exercise
 *  description: all about exercise
 * definitions:
 *  exercise:
 *    type: object
 *    properties:
 *      exerciseCode:
 *        type: integer
 *      exerciseName:
 *        type: string
 */
const route = Router();
module.exports = app => {
  app.use('/exercises', route);

  /**
   * @swagger
   * /exercises:
   *  get:
   *    summary: get all exercises
   *    description: get all exercises
   *    tags: [Exercise]
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: OK
   *        schema:
   *          type: object
   *          $ref: '#/definitions/exercise'
   */
  route.get('/', async (req, res, next) => {
    try {
      const result = await exerciseService.getAll();
      res.json(result);
    } catch (err) {
      return next(err);
    }
  });
};
