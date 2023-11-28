//jshint esversion:6

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'test',
  password: null,
  database: 'user',
});

connection.query(
  'SELECT * FROM `users` WHERE `Age` > 25;',
  function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      results.forEach((result) => {
        console.log(result.Username, result.Password);
      });
    }
  }
);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3030;
}

app.listen(port, function () {
  console.log('Server has started on port: ' + port);
});
