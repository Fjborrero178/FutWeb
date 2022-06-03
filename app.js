const express = require("express");
const path = require("path");
const mysql = require('mysql');


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect((err) => {
if (err) {
    console.error('error conecting: ' + err.stack);
    return;
}
else {
    console.log("Connected to database.");
}
});



const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/style.css"));
  });

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
