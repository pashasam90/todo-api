const Todo = require('../models/todo');


async function getAll (req, res){
        try {
            const todos = await Todo.find();
            if (!todos) return res.status(404).json("Not found");
            res.json(todos);
        } catch (err){
            res.status(500).json({error: 'Ошибка сервера'});
        }
}

async function getOne (req, res) {
    try {
        const todo = await Todo.findOne({_id: req.params.id});
        if (!todo) return res.status(404).json("Not found");
        res.json(todo)
    } catch (err){
        res.status(500).json({error: "Ошибка сервера"});
    }
}

async function createTodo(req, res){
    const body = req.body;

    if (!body.title || !body.title.trim()) {
        return res.status(400).json({error: 'title обязательное поле'});
    };
    try {
        const newTodo = await Todo.create({title: body.title, completed: body.completed ?? false});
        res.status(201).json(newTodo);
    } catch (err){
        res.status(500).json({error: "Ошибка сервера"});
    }
}

async function update(req, res) {
    const {title, completed} = req.body;
    const id = req.params.id;
    const updata = {};
    if (title !== undefined){updata.title = title}
    if (completed !== undefined){updata.completed = completed}
    try {
        const todo = await Todo.findByIdAndUpdate( id, updata, {new: true});
        if (!todo) return res.status(404).json('Not found');
        res.json(todo);
    } catch (err) {
        res.status(500).json({error: "Ошибка сервера"});
    }
}

async function deleteTodo(req, res) {
    const id = req.params.id;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json("Not found")
        } else {
            res.json('Deleted');
        }
    } catch (error) {
        res.status(500).json({error: "Ошибка сервера"});
    } 
}

module.exports = {getAll, getOne, createTodo, update, deleteTodo};