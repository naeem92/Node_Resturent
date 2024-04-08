const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB Connection URL
//const mongoURL = process.env.mongoURL_LOCAL; 
const mongoURL = process.env.mongoURL;
// SetUp the mongoDB connection
mongoose.connect(mongoURL);

// Get the Default Connection
const db = mongoose.connection;

// Define Event Listeners for MongoDB Connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('MongoDB Connection Error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Export the Database Connection
module.exports = db;
