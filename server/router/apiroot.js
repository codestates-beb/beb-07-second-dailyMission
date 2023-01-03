const express = require('express');
const router = express.Router();

const selComment = require('../function/selcomment');

router.get('/', (req, res) => {
  res.send('This is api router');
});

router.post('/selcomment', (req, res) => {
  selComment(req, res);
});

module.exports = router;
