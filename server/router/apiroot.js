const express = require('express');
const router = express.Router();

const { signUp } = require('../controller/signup');
const { signIn } = require('../controller/signin');
const { getMyInfo } = require('../controller/getMyInfo');

const {
  missionDetail,
  newMission,
  missions,
} = require('./../controller/missionController');
const { newComment } = require('./../controller/commentController');
const selComment = require('../controller/selcomment');
const { checkWallet } = require('../controller/checkWalletExist');
const tokenTransfer = require('../controller/transferToken');
const devRouter = require('../controller/dev/devRouter');
const { getFaucet, getLastFaucet } = require('../controller/faucetController');
const mintNFT = require('../controller/mintNFT');

router.get('/', (req, res) => {
  res.writeHead(301, {
    Location: 'https://documenter.getpostman.com/view/3535243/2s8Z75RUrG',
  });
  res.end();
});

router.get('/missions', missions);
router.get('/missiondetail', missionDetail);
router.post('/newmission', newMission);
router.post('/newcomment', newComment);

router.post('/transfertoken', tokenTransfer);

router.post('/selcomment', selComment);
router.get('/address/:address', checkWallet);
router.use('/dev', devRouter);
router.post('/mintnft', mintNFT);

router.post('/signup', signUp);
router.post('/signin', signIn);

router.get('/getfaucet', getFaucet);
router.get('/lastfaucet', getLastFaucet);

router.get('/mypage', getMyInfo);

module.exports = router;
