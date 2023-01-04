const express = require('express');
const router = express.Router();
const { signUp } = require('../controller/signup');
const {
  missionDetail,
  newMission,
  missions,
} = require('./../controller/missionController');
const { newComment } = require('./../controller/commentController');
const selComment = require('../controller/selcomment');
const { checkWallet } = require('../controller/checkWalletExist');
const tokenTransfer = require('../controller/transferToken');

router.get('/', (req, res) => {
  res.send('This is api router');
});

router.get('/missions', missions);
router.get('/missiondetail', missionDetail);
router.post('/newmission', newMission);
router.get('/newcomment', newComment);

router.post('/transfertoken', tokenTransfer);

router.post('/selcomment', selComment);
router.get('/address/:address', checkWallet);

router.post('/signup', signUp);


module.exports = router;
