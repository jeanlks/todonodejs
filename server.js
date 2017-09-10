var {mongoose} = require('./db/db');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,resp)=> {
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
    Todo.find().then((docs)=>{
        res.send(docs);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('server started');
})