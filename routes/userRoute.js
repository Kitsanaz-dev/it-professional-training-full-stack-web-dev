const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateUserCreation } = require('../middleware/validation');

// Admin and Manager can create users with appropriate permissions
router.post('/', 
    authenticate,
    authorize(['admin', 'manager']),
    validateUserCreation,
    userController.createUser
);

module.exports = router;