const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const apiRouter = require('./router/apiroot');
const usersRouter = require('./router/users');

const http = require('http').createServer(app);
http.listen(8080, () => {
  console.log('Listening 8080');
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/users', usersRouter);