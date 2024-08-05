const express = require('express');
const Todo = require('../models/Todo')
const { homeController, addTodoController } = require('../controllers/TodoController')
//initiate route
const todoRouter = express.Router();

//home route
todoRouter.get('/', homeController)
//newtodo route
todoRouter.get('/newtodo', addTodoController)
//edit todo route
todoRouter.get('/edit-todo', (req, res, next) => {
    try {
        const title = 'Edit Todo'
        res.render('edit-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//delete todo route
todoRouter.get('/delete-todo', (req, res, next) => {
    try {
        const title = 'Delete Todo'
        res.render('delete-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// add new student post route
todoRouter.post('/create-todo', async(req, res, next) => {
    try {
        console.log(req.body);
        
        const {title, description} = req.body;
        if(!title){
           return res.status(400).json({message: "Todo title is required"});
        }
        
        const todo = await Todo.create({
            title,
            description,
        });
        if (todo){
            return res.redirect('/');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = todoRouter;