require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middleware/error');

const SALT_ROUNDS = 10;

// Регистрация нового пользователя
async function register (req, res, next) {
    try {
        const body = req.body;
        const hashPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
        const newUser = await User.create({email: body.email, password: hashPassword});
        const userStatus = await User.findById(newUser._id).select('-password');
        res.status(201).json(userStatus);
    } catch (err){
        if (err.code === 11000) return next(new AppError("Такой email уже зарегистрирован", 400));
        return next(new AppError("Ошибка сервера", 500));
    }
}

// Вход пользователя
async function userLogIn (req, res, next) {
    const {email, password} = req.body;
    try{
        const userEmail = await User.findOne({email: email});
        if (!userEmail) {
            return next(new AppError("Неверный логин или пароль", 401));
        } else {
            const checkPassword = await bcrypt.compare(password, userEmail.password);
            if (checkPassword) {
                const token = jwt.sign(
                    {userId: userEmail._id, email: userEmail.email},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRES}
                );
                const userWithoutPassword = userEmail.toObject();
                delete userWithoutPassword.password;
                return res.status(200).json({ token, user: userWithoutPassword});
            } else {
                return next(new AppError("Неверный логин или пароль", 401));
            }
        }
    } catch (err) {
        return next(new AppError("Ошибка сервера", 500));
    }
}

module.exports = {register, userLogIn};