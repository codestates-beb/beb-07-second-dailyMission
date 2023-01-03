const express = require("express");
const router = express.Router();
const {
  missionDetail,
  newMission,
  missions,
} = require("./../controller/missionController");

router.get("/missions", missions);
router.get("/detail", missionDetail);
router.post("/newmission", newMission);

module.exports = router;
