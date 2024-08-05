const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000

//connect database
mongoose.connect(process.env.DBCONNECTIONSTRING)
    .then(() => console.log('Database Connection Successful'))
    .catch((erorr) => console.log(erorr.message));

//set view engine
app.set('view engine', 'ejs');
//serve static files from public directory
app.use(express.static(path.join(__dirname,'public')));
//serve static files from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')))


//home route
app.get('/', (req, res, next) => {
    try {
        const title = 'All Todos'
        res.render('index', {title})
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
//listen on our server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));