const express = require('express');
const router = express.Router();
const db = require('../models_aws/index');

router.get('/getExercises', async (req, res) => {
  try {
    const exercises = await db.Exercise.findAll({ attributes: ['ExerciseCode', 'ExerciseName', 'Target']});
    console.log(exercises);
    res.json(exercises);
  } catch (err) {
    console.log(err);
    res.status(500).send('server err');
  }
});

module.exports = router;
