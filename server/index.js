const Express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const express = Express();
const App = require("./app.js");
const cors = require("cors");

const app = new App();
express.use(cors());

express.use(Express.static(path.join(__dirname, "../", "build")));

express.get("/ping", function(req, res) {
  return res.send("pong");
});

express.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

console.log(process.env.PORT);
express.listen(process.env.PORT || 5000);
