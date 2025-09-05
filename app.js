const express = require("express");
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const helloRoutes = require('./routes/helloRoute');
const courseRoutes = require('./routes/courseRoute');
const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoute');
const customerRoutes = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');

const app = express();

// Logging middleware
app.use(morgan('combined'));

// Security middleware
app.use(helmet());

// Routes
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API', success: true, version: "1.0.0", author: "Kitsana" });
});

// Use routes

app.use('/api/hello', helloRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoute);
app.use('/api/users', userRoutes);

module.exports = app;