const express = require("express");

const app = express();
app.use(express.json());

const connectDB = require('./config/db');
connectDB();
const todosRoutes = require('./routes/todos');
app.use('/todos', todosRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.listen(3000, ()=>{
    console.log('Server is running!');
});
