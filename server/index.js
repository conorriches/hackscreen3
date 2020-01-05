const Express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const express = Express();
const App = require("./app.js");

const app = new App();

express.get("/ping", function(req, res) {
  return res.send("pong");
});

express.listen(process.env.PORT || 5000);
