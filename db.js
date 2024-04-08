const mongoose = require('mongoose');

// Define the MongoDB Connection URL
//const mongoURL = 'mongodb://localhost:27017/Resturent'; // Replace with your Database Name
const mongoURL = 'mongodb+srv://naeemakram:naeemakram@restaurant.svvkbxg.mongodb.net/'; //Incorrect Username and Password Due to Security reasons
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
