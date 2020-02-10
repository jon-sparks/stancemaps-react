const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const db = require('./queries')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/bumps', db.getBumps)

// app.get('/ping', function (req, res) {

//   fetch(`https://places.sit.ls.hereapi.com/places/v1/autosuggest?app_id=xm8gUL0xdsrDwtVYGJL4&app_code=clYtcwwAK6n0giMRsN3OeQ&at=52.5304417,13.4111201&q=${req.query.loc}&pretty&size=5`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     return res.send(data);
//   })

// });

app.get('/createroute', function (req, res) {
 
  fetch(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=HnSYQXJYOLQAGFkthNCjSYdKzEjwrfxthpOqhcL5gSQ&waypoint0=geo!${req.query.from}&waypoint1=geo!${req.query.to}8&mode=fastest;car;traffic:disabled&routeAttributes=sh`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return res.send(data);
  })
  
});

app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);