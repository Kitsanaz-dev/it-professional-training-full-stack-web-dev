const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin, checkValidationResult } = require('../middleware/validation');
const { loginLimiter, registerLimiter, authLimiter } = require('../middleware/rateLimiter');
// const { authenticate } = require('../middleware/auth');

// Apply general rate limiting to all auth routes
router.use(authLimiter);

// Public routes
router.post('/register', 
    registerLimiter,
    validateRegistration, 
    checkValidationResult, 
    authController.register
);

router.post('/login', 
    loginLimiter,
    validateLogin, 
    checkValidationResult, 
    authController.login
);

router.post('/refresh-token', authController.refreshToken);

// Protected routes (require authentication)
// router.post('/logout', authenticate, authController.logout);
// router.post('/logout-all', authenticate, authController.logoutAll);
// router.get('/profile', authenticate, authController.getProfile);
// router.post('/logout', authController.logout);
// router.post('/logout-all', authController.logoutAll);
// router.get('/profile', authController.getProfile);
module.exports = router;