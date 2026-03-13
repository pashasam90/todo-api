const express = require('express');
const { validate } = require('../middleware/validate');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user');
const { register, userLogIn } = require('../controllers/authController');

router.post('/register', 
    [
        body('email', "Почта не соответсвует").isEmail().normalizeEmail(),
        body('password', "Пароль должен быть больше 6 меньше 10 символов")
        .notEmpty().isLength({ min: 6, max: 10})
    ],
    validate,
    register
);

router.post('/login', 
    [
        body('email').isEmail().normalizeEmail(),
        body('password', "Пароль должен быть больше 6 меньше 10 символов")
        .notEmpty().isLength({ min: 6, max: 10 })
    ],
    validate,
    userLogIn
);

module.exports = router;