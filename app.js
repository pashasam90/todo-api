require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const todosRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const { authMiddleware } = require('./middleware/auth');
const {errorHandling} = require('./middleware/error');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todosRoutes);

// Error handling middleware
app.use(errorHandling);

app.listen( 3000, () => { 
    console.log(`Server is running!`);
} );
