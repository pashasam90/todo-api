require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const { AppError } = require('../middleware/error');

// Middleware для проверки авторизации
function authMiddleware (req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return next(new AppError('Не нашли токен', 401));
        if (!authHeader.startsWith('Bearer ')) return next(new AppError("Не авторизован", 401));
        const token = authHeader && authHeader.split(' ')[1];
        console.log(req.headers.authorization);
        if (!token) return next(new AppError("Не авторизован", 401));

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if (err) return next(new AppError("Не авторизован", 401));
            req.userId = decoded.userId;
            next();
        });
    } catch (err) {
        return next(new AppError("Не авторизован", 401));
    }
}


module.exports = {authMiddleware}