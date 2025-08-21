const express = require('express');
const todoItemsRouter = express.Router();
const todoItemsController = require('../controller/todoItemsController.js');
todoItemsRouter.post('/', todoItemsController.createTodoItem);
todoItemsRouter.get('/', todoItemsController.getAllTodoItems);
todoItemsRouter.put('/:id/completed', todoItemsController.markTodoItemCompleted);
todoItemsRouter.delete('/:id', todoItemsController.deleteTodoItem);


module.exports = todoItemsRouter;