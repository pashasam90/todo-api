const express = require("express");
const router = express.Router();
const { getOne, getAll, createTodo, update, deleteTodo } = require("../controllers/todosController");

//получить все задачи
router.get('/', getAll);

//получить одну задачу
router.get('/:id', getOne);

//создать задачу
router.post('/', createTodo);

//обновить задачу
router.put('/:id', update);

//удалить задачу
router.delete('/:id', deleteTodo);

module.exports = router;