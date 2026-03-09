const express = require('express');
const { validate } = require('../middleware/validate');
const router = express.Router();
const {body} = require('express-validator');
const User = require('../models/user');
const { register, userLogIn } = require('../controllers/authController');

router.post('/register', 
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 })
    ],
    validate,
    register
);

router.post('/login', 
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 })
    ],
    validate,
    userLogIn
);

module.exports = router;