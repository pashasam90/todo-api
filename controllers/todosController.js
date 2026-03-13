const Todo = require('../models/todo');
const { AppError } = require('../middleware/error');



async function getAll (req, res, next){
        try {
            const todos = await Todo.find({userId: req.userId});
            res.json(todos);
        } catch (err){
            return next(new AppError('Ошибка сервера', 500));
        }
}

async function getOne (req, res, next) {
    try {
        const todo = await Todo.findOne({userId: req.userId, _id: req.params.id});
        if (!todo) return next(new AppError("Не найдено", 404));
        res.json(todo)
    } catch (err){
        return next(new AppError("Ошибка сервера", 500));
    }
}

async function createTodo(req, res, next){
    const body = req.body;

    try {
        const newTodo = await Todo.create({userId: req.userId, title: body.title, completed: body.completed ?? false});
        res.status(201).json(newTodo);
    } catch (err){
        return next(new AppError("Ошибка сервера", 500));
    }
}

async function update(req, res, next) {
    const {title, completed} = req.body;
    const id = req.params.id;
    const updata = {};
    if (title !== undefined){updata.title = title}
    if (completed !== undefined){updata.completed = completed}
    try {
        const todo = await Todo.findOneAndUpdate(
            {userId: req.userId, _id: id}, 
            updata, 
            {new: true}
        );
        if (!todo) return next(new AppError("Не найдено", 404));
        res.json(todo);
    } catch (err) {
        return next(new AppError("Ошибка сервера", 500));
    }
}

async function deleteTodo(req, res, next) {
    const id = req.params.id;
    try {
        const todo = await Todo.findOneAndDelete({userId: req.userId, _id: id});
        if (!todo) {
            return next(new AppError("Не найдено", 404));
        } else {
            res.json('Deleted');
        }
    } catch (error) {
        return next(new AppError("Ошибка сервера", 500));
    } 
}

module.exports = {getAll, getOne, createTodo, update, deleteTodo};