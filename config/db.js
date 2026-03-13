require('dotenv').config();
const mongoose = require('mongoose');

// Используем переменную окружения MONGO_URI для подключения к базе данных
function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB подключена'))
        .catch(err => console.log('Ошибка:', err));
}

module.exports = connectDB;