const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, measurementController.saveMeasurement);

router.get('/', authMiddleware, measurementController.getAllMeasurements);

router.get('/monthly-summary', authMiddleware, measurementController.getMonthlySummary); 

router.get('/latest-analysis', authMiddleware, measurementController.getLatestAnalysis);

module.exports = router;