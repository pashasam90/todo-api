const express = require("express");

const app = express();
app.use(express.json());

const connectDB = require('./config/db');
connectDB();
const Todo = require('./models/todo');
const todosRoutes = require('./routes/todos');
app.use('/todos', todosRoutes);


app.listen(3000, ()=>{
    console.log('Server is running!');
});
