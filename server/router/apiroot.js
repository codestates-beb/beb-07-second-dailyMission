const express = require("express");
const router = express.Router();

const {
  missionDetail,
  newMission,
  missions,
} = require("./../controller/missionController");
const { newComment } = require("./../controller/commentController");

router.get("/", (req, res) => {
  res.send("This is api router");
});

router.get("/missions", missions);
router.get("/missiondetail", missionDetail);
router.post("/newmission", newMission);
router.get("/newcomment", newComment);
const selComment = require("../controller/selcomment");

router.get("/", (req, res) => {
  res.send("This is api router");
});

router.post("/selcomment", (req, res) => {
  selComment(req, res);
});

module.exports = router;
