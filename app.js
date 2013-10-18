var express = require("express");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.sendfile('index.html');
});

/*
app.get('/names', function(req, res) {
    res.send([{name:'Natacha Atlas'}, {name:'Cyrine Abdelnour'}, {name:'Amr Diab'}]);
});
*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});