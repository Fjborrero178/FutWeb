const express = require("express");
const path = require("path");
const mysql = require('mysql');
const config = require('dotenv').config();
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/registro.html"));
});
app.get("/sesion", (req, res) => {
  res.sendFile(path.join(__dirname + "/sesion.html"));
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/style.css"));
  });

app.get("/styleregistro.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/styleregistro.css"));
});

  app.get("/bayer.png", function (req, res) {
    res.sendFile(path.join(__dirname + "/bayer.png"));
});

app.get("/city.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/city.png"));
});

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});


var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();
 
connection.query('SELECT grupo, equipo FROM Telematica.grupos, Telematica.equipos WHERE Telematica.grupos.idequipo=Telematica.equipos.idequipos', function (error, grupo,equipo) {
  if (error) throw error;
  console.log(equipo,grupo);
});

connection.end();