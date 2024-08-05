const express = require('express')
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

//listen on our server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));