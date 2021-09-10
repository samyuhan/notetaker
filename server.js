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
app.get('/api/notes', function (req, res) {
    res.json(db.slice(1));
});

// get route to get index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// get route for notes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', function (req, res) {
    const newNote = req.body;
    if (!Array.isArray(db))
        db = [];
    
    if (db.length === 0)
        db.push(0);

    req.body.id = db[0];
    db[0]++;

    db.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(db, null, 2)
    );
    res.json(newNote);
});
    
// set up listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});