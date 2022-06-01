var mysql = require('mysql');
var express = require('express')

function createGameownerships(req, res, next, pool){
    var result = req.body
    if (result.PurchaseDate == "") res.status(500).send("Must enter a purchase date")
    else {
        pool.query("INSERT INTO GameOwnerships (UserID, GameID, PurchaseDate) VALUES (?, ?, ?);", [result.UserID, result.GameID, result.PurchaseDate], function (err) {
            if (err) {
                res.status(500).send(err.message)
            }
            else {
                res.status(200).send()
            }
        })
    }
}

function retrieveGameownerhips(req, res, next, pool){
    var result = req.body
    pool.query("SELECT Users.UserName as uname, GameOwnerships.PurchaseDate as pdate, Games.GameName as gname from Users NATURAL JOIN GameOwnerships NATURAL JOIN Games WHERE ((Users.UserID = ? OR ?=\'NULL\') AND (Games.GameID = ? OR ?=\'NULL\'));", [result.UserID, result.UserID, result.GameID, result.GameID], function (err, rows, fields) {
        if (err) {
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(JSON.stringify(rows))
        }
    })
}

function deleteGameownerships(req, res, next, pool){
    var result = req.body
    pool.query("DELETE FROM GameOwnerships WHERE ((GameID = ? OR ? = \'NULL\') AND (UserID = ? OR ? = \'NULL\'));", [result.GameID, result.GameID, result.UserID, result.UserID], function (err, rows, field){
      if (err){
        res.status(500).send(err.message)
      }
      else{
        res.status(200).send()
      }
    })
}

module.exports = {createGameownerships, retrieveGameownerhips, deleteGameownerships}