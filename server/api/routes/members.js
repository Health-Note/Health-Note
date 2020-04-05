const middleware = require('../middlewares');
const memberService = require('../../services/members');
const { Router } = require('express');

const route = Router();
module.exports = app => {
  app.use('/members', route);

  route.post('/', middleware.isAuth, async (req, res, next) => {
    
    try {
      await memberService.create(req.body);
      res.staus(204).end();
    } catch (err) {
      //console.log(err);
      //res.status(500).send('server err');
      return next(err);
    }
    
  });

  route.get('/', middleware.isAuth, async (req, res, next) => {
    
    try {
      const result = await memberService.getAll(req.user);
      res.json(result);
    } catch(err) {
      return next(err);
    }
  });

  route.delete('/', middleware.isAuth, async (req, res, next) => {
    const selectedRow = req.body;
    console.log('selectedRow', selectedRow);
    
    try {
      await memberService.remove(req.body);
      res.status(204).end();
    } catch(err) {
      return next(err);
    }

  });
};
