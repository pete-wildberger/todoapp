var express = require('express');
var router = express.Router();

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
      var resultSet = connection.query('SELECT * FROM todo_table');
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

module.exports = router;
