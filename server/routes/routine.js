const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../models/index');

// @route   POST api/routine/setRoutine
// @desc    루틴 설정하기
// @access  Public
router.post('/setRoutine', async (req, res) => {
  console.log(req.body);
  //db.Routine.create()
});

module.exports = router;
