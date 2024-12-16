//config/db
require('dotenv').config();
const mongoose = require('mongoose');


console.log("MONGO_URI: " ,process.env.MONGO_URIDB);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URIDB );
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
