const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../utils/jwt');
const { comparePassword } = require('../utils/passwordUtils');

// Register new user
const register = async (req, res) => {
  try {
      const { firstName, lastName, email, username, password, role = 'cashier' } = req.body;
      
      // 🔒 Security: Ensure only basic roles can be assigned via public registration
      const allowedRoles = ['cashier', 'staff'];
      const assignedRole = allowedRoles.includes(role) ? role : 'cashier';
      
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
      
      // Create new user with limited role
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
          firstName,
          lastName,
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          password: hashedPassword,
          role: assignedRole,  // 🔒 Only basic roles allowed
          isActive: true
      });
      
      await newUser.save();
      
      // Generate tokens
      const tokenPayload = {
          userId: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role
      };
      
      const accessToken = generateToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);
      
      // Save refresh token
      newUser.refreshTokens.push({
          token: refreshToken,
          createdAt: new Date()
      });
      await newUser.save();
      
      // Remove password from response
      newUser.password = undefined;
      
      res.status(201).json({
          success: true,
          message: 'User registered successfully',
          data: {
              user: newUser,
              accessToken,
              refreshToken,
              expiresIn: process.env.JWT_EXPIRE || '7d'
          }
      });
      
  } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0];
          return res.status(409).json({
              success: false,
              message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
          });
      }
      
      res.status(500).json({
          success: false,
          message: 'Registration failed',
          ...(process.env.NODE_ENV === 'development' && { error: error.message })
      });
  }
};

module.exports = {
  register
};