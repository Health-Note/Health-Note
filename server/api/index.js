const express = require('express');

const auth = require('./routes/auth');
const exercises = require('./routes/exercises');
const members = require('./routes/members');
const routines = require('./routes/routines');
const schedules = require('./routes/schedules');
const statistics = require('./routes/statistics');
const trainers = require('./routes/trainers');

// guaranteed to get dependencies
module.exports = () => {
	const router = express.Router();
	auth(router);
	exercises(router);
	members(router);
	routines(router);
	schedules(router);
	statistics(router);
	trainers(router);

	return router
}