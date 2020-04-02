const { Router } = require('express');
const exerciseService = require('../../services/exercises');

const route = Router();
module.exports = app => {
  app.use('/exercises', route);

  route.get('/', async (req, res, next) => {
    try {
      const result = await exerciseService.getAll();
      //console.log(result);
      res.json(result);
    } catch (err) {
      //console.log(err);
      //res.status(500).send('server err');
      return next(err);
    }
  });
};
