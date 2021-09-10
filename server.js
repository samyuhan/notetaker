// require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db")

// set up express app
var app = express();
var PORT = process.env.PORT || 3001;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get notes list
app.get('/api/notes', (req, res) => {
    res.json(db.slice(1));
});

// get route to get index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// get route for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// set up listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});