const express = require("express");
const router = express.Router();
const { newComment } = require("./../controller/commentController");

router.get("/newcomment", newComment);

module.exports = router;
