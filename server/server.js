var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');
var app = express();
var port = 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req,resp)=> {
    console.log(`Inserting todo, text: ${req.body.text}`);
    var body = _.pick(req.body,'text');
    var todo = Todo({
        text: body.text
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

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port , () => {
    console.log('Server started');
})




module.exports = {app};