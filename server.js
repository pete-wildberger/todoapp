//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var todo = require('./routes/todo');

//globals

var port = 2017;

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/todo', todo);

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url
