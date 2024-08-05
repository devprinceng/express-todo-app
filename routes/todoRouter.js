const express = require('express');

const { 
    homeController,
    todoFormController,
    editTodoController,
    deleteTodoPageController,
    createTodoController,
    updateTodoController,
    deleteTodoController
} = require('../controllers/TodoController')
//initiate route
const todoRouter = express.Router();

//home route
todoRouter.get('/', homeController)
todoRouter.get('/newtodo', todoFormController) //*newtodo route
todoRouter.get('/edit-todo', editTodoController) //*edit todo route
todoRouter.get('/delete-todo', deleteTodoPageController) //*delete todo page route
todoRouter.post('/create-todo', createTodoController) //* add new todo route
todoRouter.post('/update-todo/:id', updateTodoController) //* update todo route
todoRouter.get('/confirm-delete/', deleteTodoController) //* delete todo route
module.exports = todoRouter;