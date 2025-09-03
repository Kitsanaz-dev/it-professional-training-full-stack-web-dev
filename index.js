require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = require('./app');
const connectDB = require('./config/database');

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});
