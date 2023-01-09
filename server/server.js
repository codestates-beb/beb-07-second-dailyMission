const express = require('express');
const cors = require('cors');
const path = require('path');

const cron = require('node-cron');
const checkMission = require('./cronjob/checkMissions');

const app = express();

const apiRouter = require('./router/apiroot');

const http = require('http').createServer(app);
http.listen(8080, () => {
  console.log('Listening 8080');
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

cron.schedule('* * * * *', () => {
  checkMission();
});
