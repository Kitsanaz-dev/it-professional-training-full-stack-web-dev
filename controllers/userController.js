const { hashPassword } = require('../utils/passwordUtils');
const User = require('../models/User');

// Create user (Admin only - can assign any role)
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, role = 'cashier' } = req.body;
        const currentUserRole = req.user.role;
        
        // 🔒 Role-based creation permissions
        const roleHierarchy = {
            'admin': ['admin', 'manager', 'cashier', 'staff'],
            'manager': ['cashier', 'staff']
        };
        
        const allowedRoles = roleHierarchy[currentUserRole] || [];
        
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: `${currentUserRole}s cannot create users with ${role} role`
            });
        }
        
        // Check for existing users
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: existingUser.email === email ? 
                    'Email already registered' : 
                    'Username already taken'
            });
        }
        
        // Create user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: hashedPassword,
            role,
            isActive: true,
            createdBy: req.user.userId
        });
        
        await newUser.save();
        newUser.password = undefined;
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { user: newUser }
        });
        
    } catch (error) {
        console.error('User creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

module.exports = {
    createUser
};