const { Router } = require('express');

const { authenticate } = require('../middlewares/auth.middleware.js');
const upload = require('../middlewares/file.middleware.js');

const {
  loginUser,
  registerUser,
  getUserInfo,
  uploadProfileImage,
} = require('../controllers/auth.controller.js');

const router = Router();

// Auth API routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-user', authenticate, getUserInfo);
router.post('/upload-image', upload.single('image'), uploadProfileImage);

module.exports = router;
