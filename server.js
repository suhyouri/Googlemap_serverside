const express = require("express");
// const bodyParser = require("body-parser")
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let lat;
let long;
let gpsdms;

let gpsData = {
    lat: lat,
    long: long,
    gpsdms: gpsdms
}

//setup basic json
app.get("/gps", (req, res) => {
  res.json(gpsData);
  // return res.json({
  //   lat: req.body.lat,
  //   long: req.body.long,
  // });
});

//event value
app.post("/gps", (req, res) => {
  console.log(req.body.lat);
  console.log(req.body.long);
  console.log(req.body.gpsdms);

  gpsData.lat = req.body.lat;
  gpsData.long = req.body.long;
  gpsData.gpsdms = req.body.gpsdms;

  res.json(gpsData);
  
  // -----> Data to send to html
  io.emit("dd.lat", gpsData.lat);
  io.emit("dd.long", gpsData.long);
  io.emit("finalGPS", gpsData.gpsdms);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // console.log(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5500, () => {
  console.log("listening on *:5500");
});

