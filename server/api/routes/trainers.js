const { check, validationResult } = require('express-validator');
const { Router } = require('express');
const trainerService = require('../../services/trainers');
const logger = require('../../loaders/logger');

const route = Router();
module.exports = app => {
  app.use('/trainers', route);

  // @route   POST api/trainers
  // @desc    유저등록
  // @access  Public
  route.post(
    '/',
    async (req, res, next) => {
      return res.json({});
    }
  );
};
