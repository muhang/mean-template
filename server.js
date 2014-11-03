var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');

try {
    mongoose.connect('mongodb://muhan:mg6696202@proximus.modulusmongo.net:27017/eqo8boGo');
}

catch(err) {
    console.log(err);
}

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));     // log all requests to console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
    text : String,
});

app.get('/', function (req, res) {
    // TODO: sendfile deprecated, switch to sendFile
    res.sendfile('./public/views/index.html');
});

// API
app.get('/api/todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

// POST todo and return all todos
app.post('/api/todos', function (req, res) {
    Todo.create({
        text : req.body.text
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        console.log(todo);
    });

    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todos) {
        if (err) {
            res.send(err);
        }
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

app.listen(8080);
console.log('Magic happens on 8080');
