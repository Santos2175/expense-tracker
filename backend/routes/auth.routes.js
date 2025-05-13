const { Router } = require('express');

const {} = '../controllers/auth.controller';

const router = Router();

// Auth API routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/getUser', getUserInfo);

module.exports = router;
