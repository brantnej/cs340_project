var mysql = require('mysql');
var express = require('express')

function createGames(req, res, next, pool){
    var result = req.body
    if (result.GameName == "" || result.ReleaseDate == "") res.status(500).send("Game must have a name and release date")
    else {
        pool.query("INSERT INTO Games (GameName, DeveloperID, ReleaseDate) VALUES (?, ?, ?);", [result.GameName, result.DeveloperID, result.ReleaseDate], function (err) {
            if (err) {
                res.status(500).send(err.message)
            }
            else {
                res.status(200).send()
            }
        })
    }
}

function retrieveGames(req, res, next, pool){
    var result = req.body
    pool.query("SELECT GameName, DeveloperName, ReleaseDate FROM Games natural join Developers WHERE (DeveloperID = ? OR ?=\'NULL\');", [result.DeveloperID, result.DeveloperID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function updateGames(req, res, next, pool){
    var result = req.body
    if (result.GameName == "" || result.ReleaseDate == "") res.status(500).send("Game must have a name and release date")
    else {
        pool.query("UPDATE Games SET GameName=?, DeveloperID=?, ReleaseDate=? WHERE GameID = ?;", [result.GameName, result.DeveloperID, result.ReleaseDate, result.GameID], function(err, rows,field){
          if (err){
            res.status(500).send(err.message)
          }
          else{
            res.status(200).send()
          }
        })
    }
}

function deleteGames(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM Games WHERE ((GameID = ? OR ? = \'NULL\') AND (DeveloperID = ? OR ? = \'NULL\'));", [result.GameID, result.GameID, result.DeveloperID, result.DeveloperID], function (err, rows, field){
    if (err){
      res.status(500).send(err.message)
    }
    else{
      res.status(200).send()
    }
  })
}

module.exports = {createGames, retrieveGames, updateGames, deleteGames}