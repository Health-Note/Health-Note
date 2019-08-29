const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../models/index');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const trainer = await db.Trainer.findByPk(req.trainer);
        console.log("트레이너", trainer)
        res.json(trainer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    
    res.send("get logged in user");
});

module.exports = router;
