var mysql = require('mysql');
var express = require('express')

function insertPosts(req, res, next, pool){
    var result = req.body
    if (result.TimeStamp == "" || result.Content == "") res.status(500).send("Must have a valid time and content")
    else {
        pool.query("INSERT INTO Posts (UserId, PostTime, Content) VALUES (?, ?, ?);", [result.UserId, result.TimeStamp, result.Content], function (err) {
            if (err) {
                res.status(500).send(err.message)
            }
            else {
                res.status(200).send()
            }
        })
    }
}

function retrievePosts(req, res, next, pool){
    var result = req.body
    pool.query("SELECT Content, PostTime, UserName FROM Posts natural join Users WHERE (Users.UserID = ? OR ? = \'NULL\');", [result.UserID, result.UserID], function (err, rows, fields) {
    if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function deletePosts(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Posts WHERE ((UserID = ? OR ? = \'NULL\') AND (PostID = ? OR ? = \'NULL\'));", [result.UserID, result.UserID, result.PostID, result.PostID], function (err, rows, field){
      if (err){
        res.status(500).send(err.message)
      }
      else{
        res.status(200).send()
      }
    })
}

module.exports = {insertPosts, retrievePosts, deletePosts}