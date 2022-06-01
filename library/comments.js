var mysql = require('mysql');
var express = require('express')

function createComments(req, res, next, pool){
    var result = req.body
    if (result.TimeStamp == "" || result.Content == "") res.status(500).send("Must have a time and content")
    else { 
      pool.query("INSERT INTO Comments (PostID, UserID, TimeStamp, Content) VALUES (?, ?, ?, ?);", [result.PostID, result.UserID, result.TimeStamp, result.Content], function (err) {
          if (err) {
              res.status(500).send(err.message)
          }
          else {
              res.status(200).send()
          }
      })
    }
}

function retrieveComments(req, res, next, pool){
    var result = req.body
    pool.query("with all_posts as (select Posts.Content as OriginalPostContent, Users.UserName as OriginalPoster, Posts.PostID as OriginalPostID from Posts natural join Users) SELECT Comments.Content, Users.UserName, Comments.TimeStamp, all_posts.OriginalPoster, all_posts.OriginalPostContent from Users natural join Comments join all_posts on Comments.PostID = all_posts.OriginalPostID WHERE ((Comments.PostID = ? OR ?=\'NULL\') AND (Comments.UserID = ? OR ?=\'NULL\'));", [result.PostID, result.PostID, result.UserID, result.UserID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function deleteComments(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Comments WHERE ((CommentID = ? OR ? = \'NULL\') AND (UserID = ? OR ? = \'NULL\') AND (PostID = ? OR ? = \'NULL\'));", [result.CommentID, result.CommentID, result.UserID, result.UserID, result.PostID, result.PostID], function (err, rows, field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
}

module.exports = {createComments, retrieveComments, deleteComments}