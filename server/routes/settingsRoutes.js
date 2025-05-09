const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { updateEmail, updatePassword, deleteAccount } = require('../controllers/settings');


router.put('/email', authMiddleware, updateEmail);
router.put('/password', authMiddleware, updatePassword);
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;
