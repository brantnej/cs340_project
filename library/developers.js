var mysql = require('mysql');
var express = require('express')

function createDevelopers(req, res, next, pool){
    var result = req.body
    if (result.DeveloperName == "") res.status(500).send("Developer must have a name")
    else {
        pool.query("INSERT INTO Developers (DeveloperName) VALUES (?);", [result.DeveloperName], function (err) {
            if (err) {
                res.status(500).send(err.message)
            }
            else {
                res.status(200).send()
            }
        })
    }
}

function retrieveDevelopers(req, res, next, pool){
    var result = req.body
    pool.query("SELECT * FROM Developers;", function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function updateDevelopers(req, res, next, pool){
    var result = req.body
    if (result.DeveloperName == "") res.status(500).send("Developer must have a name")
    else {
        pool.query("UPDATE Developers SET DeveloperName=? WHERE DeveloperID = ?;", [result.DeveloperName, result.DeveloperID], function(err, rows,field){
          if (err){
            res.status(500).send(err.message)
          }
          else{
            res.status(200).send()
          }
        })
    }
}

function deleteDevelopers(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Developers WHERE DeveloperID = ?;", [result.DeveloperID], function (err, rows, field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
}

module.exports = {createDevelopers, retrieveDevelopers, updateDevelopers, deleteDevelopers}