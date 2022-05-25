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
const fs = require('fs');
const { resolve } = require('path');
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

function getContext()
{
  return new Promise((resolve)=>{
  var Context = {"tables":[], "developers":[], "games":[], "users":[], "posts":[], "comments":[]};
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
            resolve(Context)
          })
        })
      })
    })
  })
})
}

app.get('/table/:tableName', (req, res, next)=>{
  if (tables.includes(req.params.tableName))
  {
    getContext().then((result) =>{
      res.status(200).render(req.params.tableName, result)
    })
  }
  else
  {
    next();
  }
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

  app.post('/create/Users', (req, res, next)=>{
    var result = req.body
    pool.query("INSERT INTO Users (UserName, BirthDate, ProfileMessage) VALUES (?, ?, ?);", [result.name, result.birthdate, result.profilemessage], function(err){
      if (err)
      {
        res.status(500).send(err.message)
      }
      else{
        res.status(200).send()
      }
    })
  })

  app.post('/retrieve/Users', (req,res,next)=>{
    var result = req.body
    pool.query("SELECT * FROM Users WHERE ((UserName = ? OR ?=\'\') AND (BirthDate = ? OR ?=\'\'));", [result.name, result.name, result.birthdate, result.birthdate], function(err, rows, fields){
      if (err)
      {
        res.status(500).send(err.message)
      }
      else {
        res.status(200).send(JSON.stringify(rows))
      }
    })
  })

app.post('/create/Posts', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO Posts (UserId, PostTime, Content) VALUES (?, ?, ?);", [result.UserId, result.TimeStamp, result.Content], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/Posts', (req, res, next) => {
  var result = req.body
  pool.query("SELECT Content, PostTime, UserName FROM Posts natural join Users WHERE (Users.UserID = ? OR ? = \'NULL\');", [result.UserID, result.UserID], function (err, rows, fields) {
    if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/create/Comments', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO Comments (PostID, UserID, TimeStamp, Content) VALUES (?, ?, ?, ?);", [result.PostID, result.UserID, result.TimeStamp, result.Content], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/Comments', (req, res, next) => {
    var result = req.body
    pool.query("with all_posts as (select Posts.Content as OriginalPostContent, Users.UserName as OriginalPoster, Posts.PostID as OriginalPostID from Posts natural join Users) SELECT Comments.Content, Users.UserName, Comments.TimeStamp, all_posts.OriginalPoster, all_posts.OriginalPostContent from Users natural join Comments join all_posts on Comments.PostID = all_posts.OriginalPostID WHERE ((Comments.PostID = ? OR ?=\'NULL\') AND (Comments.UserID = ? OR ?=\'NULL\'));", [result.PostID, result.PostID, result.UserID, result.UserID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/create/Developers', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO Developers (DeveloperName) VALUES (?);", [result.DeveloperName], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/Developers', (req, res, next) => {
    var result = req.body
    pool.query("SELECT * FROM Developers;", function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/create/Friendships', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO Friendships (UserID1, UserID2, FriendDate) VALUES (?, ?, ?);", [result.UserID1, result.UserID2, result.FriendDate], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/Friendships', (req, res, next) => {
    var result = req.body
    pool.query("with users1 as (select Users.UserID as id1, Users.UserName as User1 from Users), users2 as (select Users.UserID as id2, Users.UserName as User2 from Users) SELECT users1.User1, users2.User2, Friendships.FriendDate as fdate from users1 join Friendships on users1.id1 = Friendships.UserID1 join users2 on users2.id2 = Friendships.UserID2 WHERE (Friendships.UserID1 = ? OR Friendships.UserID2 = ?);", [result.UserID, result.UserID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/create/GameOwnerships', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO GameOwnerships (UserID, GameID, PurchaseDate) VALUES (?, ?, ?);", [result.UserID, result.GameID, result.PurchaseDate], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/GameOwnerships', (req, res, next) => {
    var result = req.body
    pool.query("SELECT Users.UserName as uname, GameOwnerships.PurchaseDate as pdate, Games.GameName as gname from Users NATURAL JOIN GameOwnerships NATURAL JOIN Games WHERE ((Users.UserID = ? OR ?=\'NULL\') AND (Games.GameID = ? OR ?=\'NULL\'));", [result.UserID, result.UserID, result.GameID, result.GameID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/create/Games', (req, res, next) => {
    var result = req.body
    pool.query("INSERT INTO Games (GameName, DeveloperID, ReleaseDate) VALUES (?, ?, ?);", [result.GameName, result.DeveloperID, result.ReleaseDate], function (err) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send()
        }
    })
})

app.post('/retrieve/Games', (req, res, next) => {
    var result = req.body
    pool.query("SELECT GameName, DeveloperName, ReleaseDate FROM Games natural join Developers WHERE (DeveloperID = ? OR ?=\'NULL\');", [result.DeveloperID, result.DeveloperID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
})

app.post('/delete/Users', (req, res, next) => {
  var result = req.body
  pool.query("DELETE FROM Users WHERE UserID = ?;", [result.UserID], function (err, rows, field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
})

app.post('/update/Users', (req, res, next)=>{
  var result = req.body
  pool.query("UPDATE Users SET UserName=?, BirthDate=?, ProfileMessage=? WHERE UserID = ?;", [result.name, result.birthdate, result.profilemessage, result.UserID], function(err, rows,field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
})

app.post('/update/Games', (req, res, next)=>{
  var result = req.body
  pool.query("UPDATE Games SET GameName=?, DeveloperID=?, ReleaseDate=? WHERE GameID = ?;", [result.GameName, result.DeveloperID, result.ReleaseDate, result.GameID], function(err, rows,field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
})

app.post('/update/Developers', (req, res, next)=>{
  var result = req.body
  pool.query("UPDATE Developers SET DeveloperName=? WHERE DeveloperID = ?;", [result.DeveloperName, result.DeveloperID], function(err, rows,field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
})