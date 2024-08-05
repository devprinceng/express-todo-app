const Todo = require('../models/Todo');
const moment = require('moment')

//list todos controller
const homeController = async (req, res, next) => {
    try {
        const title = 'All Todos'
        const todos = await Todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render('index', {title, todos})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// todo form controller
 const addTodoController = (req, res, next) => {
    try {
        const title = 'New Todo'
        res.render('newtodo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
 // edit todo form controller
const editTodoController = (req, res, next) => {
    try {
        const title = 'Edit Todo'
        res.render('edit-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//delete confirmation controller
const deleteTodoController = (req, res, next) => {
    try {
        const title = 'Delete Todo'
        res.render('delete-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = { 
    homeController,
    addTodoController,
    editTodoController,
    deleteTodoController
};
