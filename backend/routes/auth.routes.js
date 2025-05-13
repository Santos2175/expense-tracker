const { Router } = require('express');

const {
  loginUser,
  registerUser,
  getUserInfo,
} = require('../controllers/auth.controller.js');

const router = Router();

// Auth API routes
router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/getUser', getUserInfo);

module.exports = router;
