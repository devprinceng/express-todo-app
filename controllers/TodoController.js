const Todo = require('../models/Todo');
const moment = require('moment')

//*list todos controller
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
//* todo form controller
 const todoFormController = (req, res, next) => {
    try {
        const title = 'New Todo'
        res.render('newtodo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
 //* edit todo form controller
const editTodoController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const todo = await Todo.findById(id);
        const title = 'Edit Todo'
        res.render('edit-todo', {title, todo})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//*delete confirmation controller
const deleteTodoPageController = (req, res, next) => {
    try {
        const { id } = req.query;
        
        const title = 'Delete Todo'
        res.render('delete-todo', {title, id})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//* create todo controller
 const createTodoController = async(req, res, next) => {
    try {
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
}

 // update todo form controller
const updateTodoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({message: 'todo not found'})
        }
        todo.title = title;
        todo.description = description;
        await todo.save();

        return res.redirect('/')
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//*delete todo controller
const deleteTodoController = async (req, res, next) => {
    try {
        const { id, confirm} = req.query;
        
        if (confirm==='yes'){
            await Todo.findByIdAndDelete(id)
        }

        res.redirect('/')
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = { 
    homeController,
    todoFormController,
    editTodoController,
    deleteTodoPageController,
    createTodoController,
    updateTodoController,
    deleteTodoController
};
