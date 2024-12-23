// server.js
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const app = express();
const connectDB = require('./config/db');

const router = require('./routes/serverRouter');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', router);  // Add '/api' prefix to match the frontend URL

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
