const path = require("path");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs");
// custome module
const notes = require("./helper");

var bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "/public");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(publicPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// post
app.post("/bot", (req, res) => {
  let message = req.body.text;
  let user = req.body.user_name;
  notes.addNote(user, message);

  res.send({
    response_type: "ephemeral",
    text: "your question has been submitted,Thanks "
  });
});

// post
app.post("/", (req, res) => {
  console.log("req.body2", req.body);
  res.send(req.body.challenge);
});

//file
app.get("/file", (req, res) => {
  let data = notes.loadNotes();
  console.log(data);
  let result = data[notes.getDate()] || [];
  res.send(result);
});

//clear
app.post("/clear", (req, res) => {
  console.log("req.body2", req.body.password);
  notes.clear(req.body.password);
  res.send("cleared");
});

//message route

//clear message
app.post("/chatterbox/clearMessages", (req, res) => {
  console.log("req.body2", req.body.password);
  notes.clearMessages(req.body.password);
  res.send("cleared");
});

//get message
app.get("/chatterbox/messages", (req, res) => {
  let data = notes.loadMessages();
  console.log(data);
  let result = data[notes.getDate()] || [];
  res.send(result);
});

//post message
app.post("/chatterbox/messages", (req, res) => {
  let username = req.body.username;
  let text = req.body.text;
  let roomname = req.body.roomname;

  notes.addMessages(username, text, roomname);

  res.send({
    response_type: "save message",
    text: "your message has been submitted,Thanks "
  });
});

// option
app.options("/", (req, res) => {
  var option = {
    get: "/chatterbox/messages",
    post: "/chatterbox/messages",
    clearAll: "/chatterbox/clearMessages"
  };

  res.send(option);
});

// serve all link
app.get("*", (req, res) => {
  res.redirect("/");
});

// start the server
const PORT = process.env.PORT || 3000;
console.log("PORT", PORT);
app.listen(PORT, () => {
  console.log(chalk.green("server start at port 3000"));
});
