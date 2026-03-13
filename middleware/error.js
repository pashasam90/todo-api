class AppError extends Error {
    constructor (message, statusCode, details){
        super(message);

        this.statusCode = statusCode;
        this.details = details || [];
    }
}

// Middleware для обработки ошибок в Express
function errorHandling (err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message, details: err.details });
    } else {
        console.error(err);
        return next(new AppError("Сервер столкнулся с непредвиденной ошибкой", 500));
    }
}

module.exports = { errorHandling, AppError };