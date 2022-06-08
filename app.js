const express = require("express");
const path = require("path");
const mysql = require('mysql');
const { header } = require("express/lib/request");
const config = require('dotenv').config();
const app = express();
app.use(express.static('public'))


app.use(express.json())
app.use(express.static(__dirname + '/public'));

/* app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/registro.html"));
});
app.get("/sesion", (req, res) => {
  res.sendFile(path.join(__dirname + "/sesion.html"));
}); */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/jugadores", function (req, res) {
  res.sendFile(path.join(__dirname + "/jugadores.html"));
});

app.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname + "/admin.html"));
});


app.get("/arbitros", function (req, res) {
  res.sendFile(path.join(__dirname + "/arbitros.html"));
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

app.get(express.json());

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
 
connection.query('SELECT grupo, equipo FROM Telematica.grupos, Telematica.equipos WHERE Telematica.grupos.idequipo=Telematica.equipos.idequipos', function (error, grupo,equipo, fields) {
  if (error) throw error;
  console.log(equipo,grupo);
});

app.get('/data', async (req, res) => {
  const idequipo = req.query.idequipo;
  query = `SELECT nombre, apellido, numero, equipo
  FROM Telematica.jugadores, Telematica.equipos
  WHERE Telematica.jugadores.idequipo=Telematica.equipos.idequipos and Telematica.equipos.idequipos=${idequipo}`;
  connection.query(query, (err, result) => {
    if (!err) {
      return res.send(result).status(200);
    } else {
      console.log(`Ha ocurrido el siguiente ${err}`);
      return res.status(500);
    }
  });
 
});


app.get('/data1', async (req, res) => {
  const arbitro = req.query.arbitro;
  query1 = `SELECT nombre, apellido, procedencia FROM Telematica.arbitros;`;
  connection.query(query1, (err, result) => {
    if (!err) {
      return res.send(result).status(200);
    } else {
      console.log(`Ha ocurrido el siguiente ${err}`);
      return res.status(500);
    }
  });
 
});

app.post("/admin",async (req,res) =>{
  pare = await req.body;
  console.log(pare); 
  
});