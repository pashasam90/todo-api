const { validationResult } = require('express-validator');
const { AppError } = require('../middleware/error');


function validate (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const details = errors.array()
        return next(new AppError("Некорректные данные запроса", 400, details));
    }
    next();
}


module.exports = {validate};