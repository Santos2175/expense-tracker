const { Router } = require('express');

const { authenticate } = require('../middlewares/auth.middleware.js');

const {
  loginUser,
  registerUser,
  getUserInfo,
} = require('../controllers/auth.controller.js');

const router = Router();

// Auth API routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-user', authenticate, getUserInfo);

module.exports = router;
