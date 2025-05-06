const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
const JWT_SECRET = "yourSecretKey";
const User = require('../models/User');
const WeeklyWorkout = require('../models/WeeklyWorkout');

// POST /api/workouts/weekly
router.post('/weekly', authMiddleware, require('./../controllers/workout').saveWeeklyWorkout);

// Route to fetch the user's weekly workout plan
router.get('/weekly', authMiddleware, require('./../controllers/workout').getWeeklyWorkout);

// Example: Endpoint to get today's workout only
router.get('/today', authMiddleware, require('./../controllers/workout').getTodaysWorkout);

module.exports = router;