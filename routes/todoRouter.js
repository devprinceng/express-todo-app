const express = require('express');

const { 
    homeController,
    todoFormController,
    editTodoController,
    deleteTodoController,
    createTodoController
} = require('../controllers/TodoController')
//initiate route
const todoRouter = express.Router();

//home route
todoRouter.get('/', homeController)
todoRouter.get('/newtodo', todoFormController) //*newtodo route
todoRouter.get('/edit-todo', editTodoController) //*edit todo route
todoRouter.get('/delete-todo', deleteTodoController) //*delete todo route
todoRouter.post('/create-todo', createTodoController) //* add new student post route

module.exports = todoRouter;