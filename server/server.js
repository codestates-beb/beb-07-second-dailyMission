const express = require('express');
const cors = require('cors');
const path = require('path');

const cron = require('node-cron');
const checkMission = require('./cronjob/checkMissions');

const app = express();

const apiRouter = require('./router/apiroot');

const http = require('http').createServer(app);
// const fs = require('fs');
// const https = require('https').createServer({
//   key: fs.readFileSync(__dirname + '/private.key', 'utf-8'),
//   cert: fs.readFileSync(__dirname + '/certificate.crt', 'utf-8'),
// });

// https.listen(8080);
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
