const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express()
const connectMongoDb = require('./init/MongoDb');
dotenv.config();
const PORT = process.env.PORT || 3000

//connect Database
connectMongoDb();

//create Schema
const toDoschema = mongoose.Schema({
    title: {type: String, required: true},
    description: String,
}, {timestamps: true});

//create todo model
const Todo = mongoose.model('todo', toDoschema);

//set view engine
app.set('view engine', 'ejs');
//serve static files from public directory
app.use(express.static(path.join(__dirname,'public')));
//serve static files from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')))
app.use(bodyParser.urlencoded({extended:true}));

//home route
app.get('/', async (req, res, next) => {
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
app.get('/newtodo', (req, res, next) => {
    try {
        const title = 'New Todo'
        res.render('newtodo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//edit todo route
app.get('/edit-todo', (req, res, next) => {
    try {
        const title = 'Edit Todo'
        res.render('edit-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//delete todo route
app.get('/delete-todo', (req, res, next) => {
    try {
        const title = 'Delete Todo'
        res.render('delete-todo', {title})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// add new student post route
app.post('/create-todo', async(req, res, next) => {
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
//listen on our server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));