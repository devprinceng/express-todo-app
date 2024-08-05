const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app = express()
const connectMongoDb = require('./init/MongoDb');
const todoRouter = require('./routes/todoRouter');
dotenv.config();
const PORT = process.env.PORT || 3000

//connect Database
connectMongoDb();

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
//use todoRouter
app.use('/', todoRouter);

//listen on our server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));