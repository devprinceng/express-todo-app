const mongoose = require('mongoose')

//create Schema
const toDoschema = mongoose.Schema({
    title: {type: String, required: true},
    description: String,
}, {timestamps: true});

//create todo model
const Todo = mongoose.model('todo', toDoschema);

module.exports = Todo;
