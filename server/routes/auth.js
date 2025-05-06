const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require('../controllers/authController');

router.post('/signup',handleUserSignup);
router.post('/login',handleUserLogin);

module.exports = router;