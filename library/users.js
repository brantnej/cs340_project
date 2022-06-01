var mysql = require('mysql');
var express = require('express')

function createUsers(req, res, next, pool) {
    var result = req.body
    if (result.name == "" || result.birthdate == "") res.status(500).send("User must have name and birthdate")
    else{
        pool.query("INSERT INTO Users (UserName, BirthDate, ProfileMessage) VALUES (?, ?, ?);", [result.name, result.birthdate, result.profilemessage], function(err){
          if (err)
          {
            res.status(500).send(err.message)
          }
          else{
            res.status(200).send()
          }
        })
    }
}

function retrieveUsers(req, res, next, pool){
    var result = req.body
    //Run query
    pool.query("SELECT * FROM Users WHERE ((UserName = ? OR ?=\'\') AND (BirthDate = ? OR ?=\'\'));", [result.name, result.name, result.birthdate, result.birthdate], function(err, rows, fields){
      if (err)
      {
        //If query failed, tell the user what happened
        res.status(500).send(err.message)
      }
      else {
        //otherwise, return the JSON results of the query
        res.status(200).send(JSON.stringify(rows))
      }
    })
}

function deleteUsers(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Users WHERE UserID = ?;", [result.UserID], function (err, rows, field){
        if (err){
            res.status(500).send(err.message)
        }
        else{
            res.status(200).send()
        }
    })
}

function updateUsers(req, res, next, pool){
    var result = req.body
    if (result.name == "") res.status(500).send('User must have a name')
    else {
      pool.query("UPDATE Users SET UserName=?, BirthDate=?, ProfileMessage=? WHERE UserID = ?;", [result.name, result.birthdate, result.profilemessage, result.UserID], function(err, rows,field){
        if (err){
          res.status(500).send(err.message)
        }
        else{
          res.status(200).send()
        }
      })
  } 
}

module.exports = {createUsers, retrieveUsers, deleteUsers, updateUsers}