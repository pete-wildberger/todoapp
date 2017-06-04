//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//globals
var port = 2017;
var config = {
  database: 'todo_table',
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

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
