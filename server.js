//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var todo = require('./routes/todo');

//globals

var port = 2017;
var config = {
  database: 'tododb',
  host: 'localhost',
  port: 5432,
  max: 30
};

var pool = new pg.Pool(config);

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use('/todo', todo);

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url

app.get('/todo', function(req, res) {
  console.log('get list');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to db');
      var toDoList = [];
      var resultSet = connection.query('SELECT * FROM todo_table ORDER BY duedate');
      resultSet.on('row', function(row) {
        toDoList.push(row);
      }); //end resultSet
      resultSet.on('end', function() {
        done();
        res.send(toDoList);
      }); //end end resultSet

    }
  }); //done pool get
}); //end get

app.post('/todo', function(req, res) {
  console.log('got list:', req.body);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database');
      connection.query("INSERT INTO todo_table(item, duedate, description) values ($1, $2, $3)", [req.body.item, req.body.duedate, req.body.des ]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect
}); // end post

app.put('/todo', function(req, res) {
  console.log('todo delete');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database', req.body);
      connection.query('UPDATE todo_table SET complete = $1 WHERE id = $2', [true, req.body.id]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect

});

app.delete('/todo', function(req, res) {
  console.log('todo delete');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database', req.body);
      connection.query('DELETE FROM todo_table WHERE id = $1', [req.body.id]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect

});
