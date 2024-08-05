const express = require('express');
const Todo = require('../models/Todo')
const moment = require('moment')
//initiate route
const todoRouter = express.Router();

//home route
todoRouter.get('/', async (req, res, next) => {
    try {
        const title = 'All Todos'
        const todos = await Todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render('index', {title, todos})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

//newtodo route
todoRouter.get('/newtodo', (req, res, next) => {
    try {
        const title = 'New Todo'
        res.render('newtodo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
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