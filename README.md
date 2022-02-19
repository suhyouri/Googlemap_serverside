# rpi4-data

1. make API using app.get()
2. set app.post() to get value from client side
3. In RPI4, Test if this process works! 
   curl -d API -H 'Content-Type: application/json' http://{pulicip:portnumber/APIname}
====> Later, HTTP Request Setup
   
```javascript 
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
    //check the vla
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
```

```shell
curl -d '{"id":9,"name":"baeldung"}' -H 'Content-Type: application/json' http://localhost:8082/spring-rest/foos/new
  ```
