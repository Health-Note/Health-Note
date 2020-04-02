const express = require('express');

const auth = require('./routes/auth');
const exercises = require('./routes/exercises');
const members = require('./routes/members');
const routine = require('./routes/routine');
const schedules = require('./routes/schedules');
const statistics = require('./routes/statistics');
const trainers = require('./routes/trainers');

// guaranteed to get dependencies
module.exports = () => {
	const router = express.Router();
	auth(router);
	exercises(router);
	members(router);
	routine(router);
	schedules(router);
	statistics(router);
	trainers(router);

	return router
}