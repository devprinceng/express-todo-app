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

module.exports = { homeController };
