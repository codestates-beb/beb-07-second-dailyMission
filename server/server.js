const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const apiRouter = require("./router/apiroot");
const newCommentRouter = require("./router/comment");
const missionRouter = require("./router/mission");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.use("/newcomment", newCommentRouter);
app.use("/mission", missionRouter);

const http = require("http").createServer(app);

http.listen(8080, () => {
  console.log("Listening 8080");
});
