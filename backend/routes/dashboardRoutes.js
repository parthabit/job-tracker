const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getStats, getCharts } = require('../controllers/dashboardController');

router.use(protect);

router.get('/stats', getStats);
router.get('/charts', getCharts);

module.exports = router;
