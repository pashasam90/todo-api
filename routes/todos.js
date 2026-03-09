const express = require("express");
const router = express.Router();
const { getOne, getAll, createTodo, update, deleteTodo } = require("../controllers/todosController");
const { body, param } = require('express-validator');
const { validate } = require("../middleware/validate");



//получить все задачи
router.get('/', getAll);

//получить одну задачу
router.get('/:id',
    param('id').isMongoId(),
    validate,
    getOne
);

//создать задачу
router.post('/',
    body('title').trim().notEmpty(),
    validate,
    createTodo
);
//обновить задачу
router.put('/:id',
    [
        param('id').isMongoId(),
        body('title').optional().trim().notEmpty(),
        body('completed').optional().isBoolean()
    ],
    validate,
    update
);

//удалить задачу
router.delete('/:id',
    param('id').isMongoId(),
    validate,
    deleteTodo
);

module.exports = router;