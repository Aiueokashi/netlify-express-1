const express = require('express');
const path = require('path');
const app = express();
const serverless = require('serverless-http');
const server = serverless(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

io.set('transports', ['websocket']);
const port = process.env.PORT || 5000;

let rooms = {};
let playerTable = {};
let NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const router = express.Router();
router.get('/', (req, res) => {
  res.sendfile(join(__dirname, '../public', 'index.html'));
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));

module.exports = app;
module.exports.handler = server;
