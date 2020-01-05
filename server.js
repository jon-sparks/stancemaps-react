const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const db = require('./queries')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extrended: true,
}))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/bumps', db.getBumps)

app.get('/ping', function (req, res) {
 return res.send({"key":"1"});
});

app.get('/foo', function (req, res) {
 return res.send('sausages');
});

app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);