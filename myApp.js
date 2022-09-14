require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();


// Middleware function to parse post requests
app.use("/", bodyParser.urlencoded({extended: false}));

// Middleware function to log to console for every route
app.use("/", function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Route that loads an html page
app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html")
});

// Middleware function to load statics (css stylesheets, images, etc)
app.use("/public", express.static(__dirname + "/public"));

// Access an environment variable in a route
app.get("/json", function(req, res){
  let message = process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON": "Hello json";
  res.json({"message": message});
});

// Route that returns a date using a middleware function to create the new date
app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.send({time: req.time});
});

// Capture input parameters from a route
app.get("/:word/echo", function(req, res){
  res.json({echo: req.params.word});
});

// Capture query input parameters from a route
app.get("/name", function(req, res){
  res.json({name: req.query.first + " " + req.query.last});
});

// Parse form body from post request
app.post("/name", function(req, res){
  res.json({name: req.body.first + " " + req.body.last});
});

































 module.exports = app;
