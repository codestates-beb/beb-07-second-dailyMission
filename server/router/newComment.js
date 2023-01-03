const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is api router");
});

router.post("/newcomment", (req, res) => {
  res.send(res);
});

module.exports = router;

// mission ß