const express = require('express');
const router = express.Router();

const { getAccounts } = require('./functions/getAccounts');
const { getBalance } = require('./functions/tokenBalance');

router.get('/', (req, res) => {
  res.status(200).send('this is dev api');
});

router.get('/accounts', getAccounts);
router.get('/tokenbalance/:address', getBalance);

module.exports = router;
