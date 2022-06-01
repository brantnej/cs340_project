var mysql = require('mysql');
var express = require('express')

function createFriendships(req, res, next, pool){
    var result = req.body
    //ensure that row does not already exist in opposite order
    pool.query("SELECT * FROM Friendships WHERE ((UserID1 = ? AND UserID2 = ?) OR (UserID2 = ? AND UserID1 = ?));", [result.UserID2, result.UserID1, result.UserID2, result.UserID1], function (err, rows, fields){
      if (rows.length > 0) res.status(500).send("Error, friendship already exists")
      else if (result.UserID2 == result.UserID1) res.status(500).send("Error, user cannot friend themselves")
      else if (result.FriendDate == "") res.status(500).send("Error, must enter friend dates")
      else{
        pool.query("INSERT INTO Friendships (UserID1, UserID2, FriendDate) VALUES (?, ?, ?);", [result.UserID1, result.UserID2, result.FriendDate], function (err) {
          if (err) {
              res.status(500).send(err.message)
          }
          else {
              res.status(200).send()
          }
      })
      }
    })
}

function retrieveFriendships(req, res, next, pool){
    var result = req.body
    pool.query("with users1 as (select Users.UserID as id1, Users.UserName as User1 from Users), users2 as (select Users.UserID as id2, Users.UserName as User2 from Users) SELECT users1.User1, users2.User2, Friendships.FriendDate as fdate from users1 join Friendships on users1.id1 = Friendships.UserID1 join users2 on users2.id2 = Friendships.UserID2 WHERE (Friendships.UserID1 = ? OR Friendships.UserID2 = ?);", [result.UserID, result.UserID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function deleteFriendships(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Friendships WHERE ((UserID1 = ? AND UserID2 = ?) OR (UserID1 = ? AND UserID2 = ?));", [result.UserID1, result.UserID2, result.UserID2, result.UserID1], function (err, rows, field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
}

module.exports = {createFriendships, retrieveFriendships, deleteFriendships}