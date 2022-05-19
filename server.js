var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs340_brantnej',
  password: process.argv[2],
  database: 'cs340_brantnej'
});

const util = require('util')
require('util.promisify').shim();
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
const fs = require('fs')
var app = express()
const readFileAsync = util.promisify(fs.readFile);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static('public'));
app.use('text/css', express.static(__dirname + '/public/style.css'))
app.use('application/javascript', express.static(__dirname + '/public/index.js'))

var port = process.argv[3];

var tables = ["Users", "Posts", "Comments", "Games", "Developers", "Friendships", "GameOwnerships"]

app.get('/', (req, res, next) => {
    var Context = {"tables":[]};
    for (i = 0; i < tables.length; i++)
    {
      Context.tables.push({"table": tables[i]})
    }
    res.status(200).render('index', Context)
})

app.get('/table/Games', (req, res, next)=>{
  var Context = {"tables":[], "developers":[], "games":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT DeveloperID, DeveloperName FROM Developers', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.developers.push({"id" : rows[i].DeveloperID, "name": rows[i].DeveloperName})
    }
    pool.query('SELECT GameID, GameName FROM Games', function(err, rows, fields){
      for (i = 0; i < rows.length; i++)
      {
        Context.games.push({"id" : rows[i].GameID, "name": rows[i].GameName})
      }
      res.status(200).render('Games', Context)
    })
  })
})

app.get('/table/Posts', (req, res, next)=>{
  var Context = {"tables":[], "users":[], "posts":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
    }
    pool.query('SELECT PostID, Content FROM Posts', function(err, rows, fields){
      for (i = 0; i < rows.length; i++)
      {
        Context.posts.push({"id" : rows[i].PostID, "content": rows[i].Content})
      }
      res.status(200).render('Posts', Context)
    })
  })
})

app.get('/table/Friendships', (req, res, next)=>{
  var Context = {"tables":[], "users":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
    }
    res.status(200).render('Friendships', Context)
  })
})

app.get('/table/Users', (req, res, next)=>{
  var Context = {"tables":[], "users":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
    }
    res.status(200).render('Users', Context)
  })
})

app.get('/table/Developers', (req, res, next)=>{
  var Context = {"tables":[], "developers":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT DeveloperID, DeveloperName FROM Developers', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.developers.push({"id" : rows[i].DeveloperID, "name": rows[i].DeveloperName})
    }
  res.status(200).render('Developers', Context)
  })
})

app.get('/table/GameOwnerships', (req, res, next)=>{
  var Context = {"tables":[], "users":[], "games":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
    }
    pool.query('SELECT GameID, GameName FROM Games', function(err, rows, fields){
      for (i = 0; i < rows.length; i++)
      {
        Context.games.push({"id" : rows[i].GameID, "name": rows[i].GameName})
      }
      res.status(200).render('GameOwnerships', Context)
    })
  })
})

app.get('/table/Comments', (req, res, next)=>{
  var Context = {"tables":[], "users":[], "posts":[], "comments":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
    }
    pool.query('SELECT PostID, Content FROM Posts', function(err, rows, fields){
      for (i = 0; i < rows.length; i++)
      {
        Context.posts.push({"id" : rows[i].PostID, "content": rows[i].Content})
      }
      pool.query('SELECT CommentID, Content FROM Comments', function(err, rows, fields){
        for (i = 0; i < rows.length; i++)
        {
          Context.comments.push({"id" : rows[i].CommentID, "content": rows[i].Content})
        }
        res.status(200).render('Comments', Context)
      })
    })
  })
})

app.get('*', (req, res, next) =>{
  var Context = {"tables":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  res.status(400).render('404', Context)
})

app.listen(port, function (err) {
    if (err) {
      throw err;
    }
    console.log("== Server listening on port", port);
  });

  app.post('/create/User', (req, res, next)=>{
    var result = req.body
    pool.query("INSERT INTO Users (UserName, BirthDate, ProfileMessage) VALUES (?, ?, ?);", [result.name, result.birthdate, result.profilemessage], function(err){
      if (err)
      {
        res.status(500).send("Error inserting data")
      }
      else{
        res.status(200).send()
      }
    })
  })