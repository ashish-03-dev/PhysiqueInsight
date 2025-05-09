const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { getUserData, updateUserData } = require('../controllers/profile');

router.get('/', authMiddleware, getUserData);
router.put('/', authMiddleware, updateUserData);

module.exports = router;
