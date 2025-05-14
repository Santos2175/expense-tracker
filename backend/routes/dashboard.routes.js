const { Router } = require('express');

const { getDashboardData } = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

// Dashboard API
router.get('/', authenticate, getDashboardData);

module.exports = router;
