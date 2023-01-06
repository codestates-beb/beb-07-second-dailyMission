const express = require("express");
const router = express.Router();
const { signUp } = require("../controller/signup");
const { signIn } = require("../controller/signin");
const {
  missionDetail,
  newMission,
  missions,
} = require("./../controller/missionController");
const { newComment } = require("./../controller/commentController");
const selComment = require("../controller/selcomment");
const { checkWallet } = require("../controller/checkWalletExist");
const tokenTransfer = require("../controller/transferToken");
const { getFaucet, getLastFaucet } = require("../controller/faucetController");

router.get("/", (req, res) => {
  res.send("This is api router");
});

router.get("/missions", missions);
router.get("/missiondetail", missionDetail);
router.post("/newmission", newMission);
router.get("/newcomment", newComment);

router.post("/transfertoken", tokenTransfer);

router.post("/selcomment", selComment);
router.get("/address/:address", checkWallet);

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/getfaucet", getFaucet);
router.get("/lastfaucet", getLastFaucet);

module.exports = router;
