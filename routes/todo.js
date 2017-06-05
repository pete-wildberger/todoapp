var express = require('express');
var router = express.Router();
var pg = require('pg');

//globals

var config = {
  database: 'tododb',
  host: 'localhost',
  port: 5432,
  max: 30
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
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

router.post('/post', function(req, res) {
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

router.put('/:id', function(req, res) {
  console.log('todo PUT');
  var id = req.params.id;
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database', id);
      connection.query('UPDATE todo_table SET complete = $1 WHERE id = $2', [req.body.completeItem, id]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect
});

router.delete('/:id', function(req, res) {
  console.log('todo delete');
  var id = req.params.id;
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database', id);
      connection.query('DELETE FROM todo_table WHERE id = $1', [id]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect

});
module.exports = router;
