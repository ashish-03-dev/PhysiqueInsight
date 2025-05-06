const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth'); // your JWT auth middleware
const { markComplete, overview } = require('../controllers/user');


router.post('/workout-complete', authenticate, markComplete);
router.get('/overview', authenticate, overview);

module.exports = router;
