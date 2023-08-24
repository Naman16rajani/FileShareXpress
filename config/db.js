require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    });    const connection = mongoose.connection;
    connection.on('error', (err) => {
        console.error('Database connection error:', err);
    });

    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    });
}


module.exports = connectDB;