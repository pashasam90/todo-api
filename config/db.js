require('dotenv').config();
const mongoose = require('mongoose');

// Подключение к MongoDB
function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB подключена'))
        .catch(err => console.log('Ошибка:', err));
}

module.exports = connectDB;