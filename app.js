require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB подключена'))
  .catch(err => console.log('Ошибка:', err));

// Схема и модель
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);



//получить все задачи
app.get('/todos', async (req, res)=>{
    try {
        const todos = await Todo.find();
        if (!todos) return res.status(404).json("Not found");
        res.json(todos);
    } catch (err){
        res.status(500).json({error: 'Ошибка сервера'});
    }

});

//получить одну задачу
app.get('/todos/:id', async (req, res)=>{
    try {
        const todo = await Todo.findOne({_id: req.params.id});
        if (!todo) return res.status(404).json("Not found");
        res.json(todo)
    } catch (err){
        res.status(500).json({error: "Ошибка сервера"});
    }
});

//создать задачу
app.post('/todos', async (req, res)=>{
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

});

//обновить задачу
app.put('/todos/:id', async (req, res)=>{
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
 
});

//удалить задачу
app.delete('/todos/:id', async (req, res) => {
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
    
});

app.listen(3000, ()=>{
    console.log('Server is running!');
});