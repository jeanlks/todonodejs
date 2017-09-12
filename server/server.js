var {mongoose} = require('./db/db');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = 3000;

app.use(bodyParser.json());

app.post('/todos', (req,resp)=> {
    console.log(`Inserting todo, text: ${req.body.text}`);
    var todo = Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
            resp.send(doc);
    }, (err) => {
        resp.status(400).send(err);
    });
})


app.get('/todos', (req,res) => {
    console.log('Getting all todos');
    Todo.find().then((todos)=>{
        res.send({
            todos
            , status: 200
        });
    },(err)=>{
        res.status(400).send(err);
    });
});

app.listen(port , () => {
    console.log('Server started');
})


module.exports = {app};