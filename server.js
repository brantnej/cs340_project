var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
const fs = require('fs')
var app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static('public'));
app.use('text/css', express.static(__dirname + '/public/style.css'))
app.use('application/javascript', express.static(__dirname + '/public/index.js'))

var port = 28828

app.get('/', (req, res, next) => {
    var Context = {'tables' : []}
    res.status(200).render('index', Context)
})


app.listen(port, function (err) {
    if (err) {
      throw err;
    }
    console.log("== Server listening on port", port);
  });