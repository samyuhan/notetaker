// require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db")

// set up express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// JSON formatting
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// get route to get index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// get route for notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// set up listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});  