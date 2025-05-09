const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/weekly', authMiddleware, require('./../controllers/workout').saveWeeklyWorkout);

router.get('/weekly', authMiddleware, require('./../controllers/workout').getWeeklyWorkout);

router.get('/today', authMiddleware, require('./../controllers/workout').getTodaysWorkout);

module.exports = router;