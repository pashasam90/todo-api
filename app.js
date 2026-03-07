const express = require("express");
const app = express();

app.use(express.json());

let todos = [
    { id: 1, title: 'Купить хлеб', completed: false, createdAt: '06.03.2026'},
    { id: 2, title: 'Учить Node.js', completed: true, createdAt: '06.03.2026'}
];

//получить все задачи
app.get('/todos', (req, res)=>{
    res.json(todos);
});

//получить одну задачу
app.get('/todos/:id', (req, res)=>{
    const todo = todos.find(t => t.id ==req.params.id);
    res.json(todo)
});

//создать задачу
app.post('/todos', (req, res)=>{
    const {title} = req.body;

    if (!title) {
        return res.status(400).json({error: 'title обязательное поле'});
    };


    const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false,
        createdAt: new Date().toLocaleDateString('ru-Ru')
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//обновить задачу
app.put('/todos/:id', (req, res)=>{
    const {title, completed} = req.body;
    const id = +req.params.id;
    const index = todos.findIndex(obj => obj.id == id)
    
    if (index === -1 ) {
        return res.status(404).json('Not found');
    } else {
        if (title !== undefined) {
            todos[index].title = title;
        }
        if (completed !== undefined) {
            todos[index].completed = completed;
        }
        res.json(todos[index]);
    }
});

//удалить задачу
app.delete('/todos/:id', (req, res) => {
    const id = +req.params.id;
    const index = todos.findIndex(obj => obj.id == id);
    if (index === -1){
        return res.status(404).json('Not found');
    } else {
        todos.splice(index, 1);
        res.json('Deleted');
    }
});

app.listen(3000, ()=>{
    console.log('Server is running!');
});