//set up the app and its dependencies
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs340_brantnej',
  password: process.argv[2],
  database: 'cs340_brantnej'
});

const users = require('./library/users.js')
const posts = require('./library/posts.js')
const games = require('./library/games.js')
const comments = require('./library/comments.js')
const developers = require('./library/developers.js')
const gameownerships = require('./library/gameownerships.js')
const friendships = require('./library/friendships.js')

const util = require('util')
require('util.promisify').shim();
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
const fs = require('fs');
const { resolve } = require('path');
var app = express()
const readFileAsync = util.promisify(fs.readFile);

//set up handbars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static('public'));
app.use('text/css', express.static(__dirname + '/public/style.css'))
app.use('application/javascript', express.static(__dirname + '/public/index.js'))

var port = process.argv[3];

var tables = ["Users", "Posts", "Comments", "Games", "Developers", "Friendships", "GameOwnerships"]

//Return the index of the app
app.get('/', (req, res, next) => {
    var Context = {"tables":[]};
    for (i = 0; i < tables.length; i++)
    {
      Context.tables.push({"table": tables[i]})
    }
    res.status(200).render('index', Context)
})

//return a list of all the foreign keys in the DB
function getContext()
{
  return new Promise((resolve)=>{
  var Context = {"tables":[], "developers":[], "games":[], "users":[], "posts":[], "comments":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }

  //Get Developer FK's
  pool.query('SELECT DeveloperID, DeveloperName FROM Developers', function(err, rows, fields){
    for (i = 0; i < rows.length; i++)
    {
      Context.developers.push({"id" : rows[i].DeveloperID, "name": rows[i].DeveloperName})
    }

    //Get Game FK's
    pool.query('SELECT GameID, GameName FROM Games', function(err, rows, fields){
      for (i = 0; i < rows.length; i++)
      {
        Context.games.push({"id" : rows[i].GameID, "name": rows[i].GameName})
      }

      //Get User FK's
      pool.query('SELECT UserID, UserName FROM Users', function(err, rows, fields){
        for (i = 0; i < rows.length; i++)
        {
          Context.users.push({"id" : rows[i].UserID, "name": rows[i].UserName})
        }

        //Get Post FK's
        pool.query('SELECT PostID, Content FROM Posts', function(err, rows, fields){
          for (i = 0; i < rows.length; i++)
          {
            Context.posts.push({"id" : rows[i].PostID, "content": rows[i].Content})
          }

          //Get Comment FK's
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

//Find the handlebars file with the table name, then render it with all the context
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

//if nothing was matched, show 404 page
app.get('*', (req, res, next) =>{
  var Context = {"tables":[]};
  for (i = 0; i < tables.length; i++)
  {
    Context.tables.push({"table": tables[i]})
  }
  res.status(400).render('404', Context)
})

//turn on the server
app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});

/*
 *CRUD FUNCTIONS FOR USERS
 */

//CREATE USERS
app.post('/create/Users', (req, res, next)=>{
  users.createUsers(req, res, next, pool)
})

//SELECT USERS
app.post('/retrieve/Users', (req,res,next)=>{
  users.retrieveUsers(req, res, next, pool)
})

//DELETE USERS
app.post('/delete/Users', (req, res, next) => {
  users.deleteUsers(req, res, next, pool)
})

//UPDATE USERS
app.post('/update/Users', (req, res, next)=>{
  users.updateUsers(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR POSTS
 */

//INSERT POST
app.post('/create/Posts', (req, res, next) => {
  posts.insertPosts(req, res, next, pool)
})

//RETRIEVE POST
app.post('/retrieve/Posts', (req, res, next) => {
  posts.retrievePosts(req, res, next, pool)
})

//DELETE POSTS
app.post('/delete/Posts', (req, res, next) => {
  posts.deletePosts(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR GAMES
 */

//CREATE GAMES
app.post('/create/Games', (req, res, next) => {
  games.createGames(req, res, next, pool)
})

//RETRIEVE GAMES
app.post('/retrieve/Games', (req, res, next) => {
  games.retrieveGames(req, res, next, pool)
})

//UPDATE GAMES
app.post('/update/Games', (req, res, next)=>{
games.updateGames(req, res, next, pool)
})

//DELETE GAMES
app.post('/delete/Games', (req, res, next) => {
  games.deleteGames(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR COMMENTS
 */

//CREATE COMMENT
app.post('/create/Comments', (req, res, next) => {
  comments.createComments(req, res, next, pool)
})

//RETRIEVE COMMENTS
app.post('/retrieve/Comments', (req, res, next) => {
  comments.retrieveComments(req, res, next, pool)
})

//DELETE COMMENTS
app.post('/delete/Comments', (req, res, next) => {
  comments.deleteComments(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR DEVELOPERS
 */

//CREATE DEVELOPERS
app.post('/create/Developers', (req, res, next) => {
  developers.createDevelopers(req, res, next, pool)
})

//RETRIEVE DEVELOPERS
app.post('/retrieve/Developers', (req, res, next) => {
  developers.retrieveDevelopers(req, res, next, pool)
})

//UPDATE DEVELOPERS
app.post('/update/Developers', (req, res, next)=>{
  developers.updateDevelopers(req, res, next, pool)
})

//DELETE DEVELOPERS
app.post('/delete/Developers', (req, res, next) => {
  developers.deleteDevelopers(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR FRIENDSHIPS
 */

//CREATE FRIENDSHIPS
app.post('/create/Friendships', (req, res, next) => {
  friendships.createFriendships(req, res, next, pool)
})

//RETRIEVE FRIENDSHIPS
app.post('/retrieve/Friendships', (req, res, next) => {
    friendships.retrieveFriendships(req, res, next, pool)
})

//DELETE FRIENDSHIPS
app.post('/delete/Friendships', (req, res, next) => {
  friendships.deleteFriendships(req, res, next, pool)
})


/*
 *CRUD FUNCTIONS FOR GAME OWNERSHIPS
 */

//CREATE GAME OWNERSHIP
app.post('/create/GameOwnerships', (req, res, next) => {
    gameownerships.createGameownerships(req, res, next, pool)
})

//RETRIEVE GAMEOWNERSHIPS
app.post('/retrieve/GameOwnerships', (req, res, next) => {
    gameownerships.retrieveGameownerhips(req, res, next, pool)
})

//DELETE GAMEOWNERSHIPS
app.post('/delete/GameOwnerships', (req, res, next) => {
  gameownerships.deleteGameownerships(req, res, next, pool)
})